import React, {
    useEffect,
    useState,
    useRef
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../../../context';
import md5 from "js-md5";
import {
    TextInput,
    Button,
    Icon
} from '../../../../components';
import {
    isoStringToDate
} from "../../../../helpers";
import {
    getProfile,
    updateProfile as updateUserData
} from "../../../../server/graphql";
import {
    client
} from '../../../../';

const Profile = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRePassword, setNewRePassword] = useState("");
    const [data, setData] = useState({
        "profilePhoto": "",
        "registerDate": "",
        "fullName": "",
        "userName": ""
    });
    const {
        colors
    } = globalState.theme;

    const newRePasswordRef = useRef();
    const newPasswordRef = useRef();

    useEffect(() => {
        setGlobalState({
            modal: {
                ...globalState.modal,
                isActive: false
            }
        });
        client.query({
            query: getProfile,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            }
        }).then(async (res) => {
            if (res.data.getProfile.response.code === 200) {
                const getUserData = res.data.getProfile.data;
                const registerDate = await isoStringToDate(getUserData.registerDate, "date");
                setData({
                    profilePhoto: getUserData.profileImageName,
                    fullName: getUserData.fullName,
                    userName: getUserData.userName,
                    registerDate: registerDate
                });
            }
            setGlobalState({
                modal: {
                    ...globalState.modal,
                    isActive: false
                }
            });
        }).catch(e => {
            setGlobalState({
                modal: {
                    ...globalState.modal,
                    isActive: false
                }
            });
        });
    }, []);

    const updateProfile = (variables) => {
        client.mutate({
            mutation: updateUserData,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: variables
        }).then((res) => {
            console.log(variables);
            if (res.data.updateProfile.code === 200) {
                setGlobalState({
                    modal: {
                        isActive: true,
                        loading: false,
                        dialog: true,
                        data: {
                            title: "Hata!",
                            message: "Başarı ile güncellenmiştir."
                        }
                    }
                });
            }
            else {
                setGlobalState({
                    modal: {
                        isActive: true,
                        loading: false,
                        dialog: true,
                        data: {
                            title: "Hata!",
                            message: res.data.updateProfile.message
                        }
                    }
                });
            }
            
        });
    };

    const submit = async () => {
        const variables = {
        };
        if (newPassword !== "" || newRePassword !== "") {
            if (oldPassword !== "") {
                variables.oldPassword = md5(oldPassword);
                if (newPassword !== "") {
                    if (newPassword !== newRePassword) {
                        setGlobalState({
                            modal: {
                                isActive: true,
                                loading: false,
                                dialog: true,
                                data: {
                                    title: "Hatalı Giriş!",
                                    message: "Yeni Şifreler Uyuşmuyor."
                                }
                            }
                        });
                    }
                    else {
                        variables.newPassword = md5(newPassword);
                        updateProfile(variables);
                    }
                }
            }
            else {
                setGlobalState({
                    modal: {
                        isActive: true,
                        loading: false,
                        dialog: true,
                        data: {
                            title: "Hatalı Giriş!",
                            message: "Lütfen Şifrenizi giriniz."
                        }
                    }
                });
            }
        }
        else {
            setGlobalState({
                modal: {
                    isActive: true,
                    loading: false,
                    dialog: true,
                    data: {
                        title: "Hata!",
                        message: "Lütfen bir değişimde bulununuz."
                    }
                }
            });
        }
    };

    return <div
        className={classes.container}
    >
        {
            data ?
                <div>
                    <div
                        className={classes.profilData}
                    >
                        <div
                            className={classes.profilePhoto}
                        >
                            <img
                                className={classes.photo}
                                src={data.profilePhoto !== "" ? data.profilePhoto : "/assets/images/default-user.png"}
                                height="350px"
                                width="100%"
                            />
                            <div
                                className={classes.updateProfilePhoto}
                                style={{
                                    backgroundColor: colors.layer3
                                }}
                            >
                                <Icon
                                    color={colors.body}
                                    name="camera"
                                    size={30}
                                />
                            </div>
                        </div>
                        <div
                            className={classes.info}
                            style={{
                                backgroundColor: colors.background
                            }}
                        >
                            <div
                                className={classes.infoTitle}
                            >
                                {data.fullName}
                            </div>
                            <div
                                className={classes.infoContent}
                            >
                                @{data.userName}
                            </div>
                        </div>
                        <div
                            className={classes.date}
                            style={{
                                backgroundColor: colors.layer1
                            }}
                        >
                            Kayıt Tarihi:<span>{data.registerDate}</span>
                        </div>
                    </div>
                    <div
                        className={classes.passwordContainer}
                        style={{
                            backgroundColor: colors.background
                        }}
                    >
                        <TextInput
                            onKeyUp={e => e.keyCode === 13 ? newPasswordRef.current.focus() : null}
                            onChangeText={e => setOldPassword(e)}
                            className={classes.input}
                            placeholder="Eski Şifre"
                            value={oldPassword}
                            type={"password"}
                        />
                        <TextInput
                            onKeyUp={e => e.keyCode === 13 ? newRePasswordRef.current.focus() : null}
                            onChangeText={e => setNewPassword(e)}
                            referance={newPasswordRef}
                            className={classes.input}
                            placeholder="Yeni Şifre"
                            value={newPassword}
                            type={"password"}
                        />
                        <TextInput
                            onKeyUp={e => e.keyCode === 13 ? submit() : null}
                            onChangeText={e => setNewRePassword(e)}
                            placeholder="Yeni Şifre Tekrar"
                            referance={newRePasswordRef}
                            className={classes.input}
                            value={newRePassword}
                            type={"password"}
                        />
                        <Button
                            className={classes.submit}
                            onClick={() => {
                                setGlobalState({
                                    modal: {
                                        isActive: true,
                                        data: undefined,
                                        type: "loading",
                                        loading: true,
                                        dialog: false
                                    }
                                });
                                submit();}}
                            textColor={colors.body}
                            color={colors.primary}
                            value="Kayıt Et"
                        />
                    </div>
                </div>
                :
                <div
                    className={classes.loading}
                    style={{
                        backgroundColor: colors.background
                    }}
                >
                    <img
                        src="/assets/images/preload.png"
                    />
                </div>
        }
    </div>;
};
export default injectSheet(stylesheet)(Profile);