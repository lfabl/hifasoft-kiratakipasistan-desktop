import React, {
    useEffect,
    useState,
    useRef
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../../../context';
import {
    TextInput,
    Button
} from '../../../../components';
import {
    isoStringToDate
} from "../../../../helpers";
import {
    getProfile
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

    const submit = () => {
        alert("submit data");
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
                        <img
                            className={classes.photo}
                            src={data.profilePhoto !== "" ? data.profilePhoto : "/assets/images/default-user.png"}
                            height="350px"
                            width="100%"
                        />
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
                        />
                        <TextInput
                            onKeyUp={e => e.keyCode === 13 ? newRePasswordRef.current.focus() : null}
                            onChangeText={e => setNewPassword(e)}
                            referance={newPasswordRef}
                            className={classes.input}
                            placeholder="Yeni Şifre"
                            value={newPassword}
                        />
                        <TextInput
                            onKeyUp={e => e.keyCode === 13 ? submit() : null}
                            onChangeText={e => setNewRePassword(e)}
                            placeholder="Yeni Şifre Tekrar"
                            referance={newRePasswordRef}
                            className={classes.input}
                            value={newRePassword}
                        />
                        <Button
                            className={classes.submit}
                            onClick={() => submit()}
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