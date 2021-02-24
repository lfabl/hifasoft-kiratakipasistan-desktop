import React, {
    useState,
    useEffect,
    useRef
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../../../context';
import {
    TextInput,
    Button,
    Icon
} from '../../../../components';
import {
    client
} from '../../../../index';
import {
    updateTenant,
    deleteTenant,
    getTenant,
} from "../../../../server/graphql";
import {
    serverAdres
} from "../../../../server/config";
import {
    fileSelector,
    customAlert
} from "../../../../helpers";

const TenantDetail = ({
    tenantID,
    classes,
    refetch
}) => {
    const selectFile = fileSelector({
        type: "image/*"
    });
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;
    const [loading, setLoading] = useState(true);
    const [suretyPhoneNumber, setSuretyPhoneNumber] = useState("");
    const [suretyTcIdentity, setSuretyTcIdentity] = useState("");
    const [newProfilePhoto, setNewProfilePhoto] = useState(null);
    const [phoneNumberTwo, setPhoneNumberTwo] = useState("");
    const [suretyFullName, setSuretyFullName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [suretyAdress, setSuretyAdress] = useState("");
    const [tenantAdress, setTenantAdress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [tcIdentity, setTcIdentity] = useState("");
    const [fullName, setFullName] = useState("");

    const suretyPhoneNumberRef = useRef();
    const suretyTcIdentityRef = useRef();
    const suretyFullNameRef = useRef();
    const suretyAdressRef = useRef();
    const tcIdentityRef = useRef();
    const phoneTwoRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();

    selectFile.addEventListener("change", () => {
        const files = selectFile.files;
        if (files.length !== 0) {
            setNewProfilePhoto(files[0]);
        }
    });
    useEffect(() => {
        getTenantData();
    }, []);

    const update = () => {
        const variables = {};
        if (newProfilePhoto !== null) variables.profileImage = newProfilePhoto;
        client.mutate({
            mutation: updateTenant,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: {
                tenantID: tenantID,
                fullName: fullName,
                tcIdentity: tcIdentity,
                phoneNumber1: phoneNumber,
                phoneNumber2: phoneNumberTwo,
                tenantAdress: tenantAdress,
                profileImageName: profilePhoto,
                suretyFullName: suretyFullName,
                suretyTcIdentity: suretyTcIdentity,
                suretyPhoneNumber: suretyPhoneNumber,
                suretyAdress: suretyAdress,
                profileImage: variables.profileImage,
                deleteProfileImage: variables.deleteProfileImage
            }
        }).then((res) => {
            if (res.data.updateTenant.code === 200) {
                setGlobalState({
                    modal: {
                        isActive: true,
                        loading: false,
                        dialog: true,
                        data: {
                            title: "Başarılı!",
                            message: "Başarılı ile güncellenmiştir."
                        }
                    }
                });
                refetch();
            }
            else {
                /* Hata var ise yapılacaklar. */
            }
        });

    };

    const getTenantData = () => {
        client.query({
            query: getTenant,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: {
                tenantID: tenantID
            },
            fetchPolicy: "network-only"
        }).then(res => {
            if (res.data.getTenant.response.code === 200) {
                const tenantData = res.data.getTenant.data;
                console.log(tenantData.phoneNumber1.replace(/ /g, ''));
                setSuretyPhoneNumber(tenantData.suretyPhoneNumber.replace(/ /g, ''));
                setSuretyTcIdentity(tenantData.suretyTcIdentity.replace(/ /g, ''));
                setPhoneNumberTwo(tenantData.phoneNumber2.replace(/ /g, ''));
                setSuretyFullName(tenantData.suretyFullName);
                setProfilePhoto(tenantData.profileImageName);
                setSuretyAdress(tenantData.suretyAdress);
                setTenantAdress(tenantData.tenantAdress);
                setPhoneNumber(tenantData.phoneNumber1.replace(/ /g, ''));
                setTcIdentity(tenantData.tcIdentity.replace(/ /g, ''));
                setFullName(tenantData.fullName);
                setLoading(false);
            }
        }).catch(e => {

        });
    };

    const deleteTenantData = () => {
        customAlert({
            message: "Kiracı Silinsinmi?",
            onPressOkey: () => {
                client.mutate({
                    mutation: deleteTenant,
                    context: {
                        headers: {
                            "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                        }
                    },
                    variables: {
                        tenantID: tenantID
                    }
                }).then((res) => {
                    if (res.data.deleteTenant.code === 200) {
                        setGlobalState({
                            modal: {
                                isActive: true,
                                loading: false,
                                dialog: true,
                                data: {
                                    title: "Başarılı!",
                                    message: "Başarılı ile silinmiştir."
                                }
                            }
                        });
                        refetch();
                    }
                    else {
                    }
                });
            }
        })
    };

    if (loading === true) return <div
        className={classes.loading}
    >
        <img
            src="/assets/images/preload.svg"
        />
    </div>;

    return <div
        className={classes.container}
        style={{
            backgroundColor: colors.background
        }}
    >
        <div
            className={classes.header}
        >
            <div
                className={classes.title}
            >
                Kiracıyı Görüntüle/Düzenle
            </div>
            <div
                className={classes.close}
                onClick={() => setGlobalState({
                    modal: {
                        ...globalState.modal,
                        isActive: false
                    }
                })}
            >
                <Icon
                    color={colors.body}
                    name="times"
                    size={24}
                />
            </div>
        </div>
        <div
            className={classes.content}
        >
            <div
                className={classes.table}
            >
                <div
                    className={classes.tableCell}
                >
                    <div
                        className={classes.profileContainer}
                    >
                        <div
                            className={classes.profile}
                        >
                            <img
                                src={newProfilePhoto !== null ? URL.createObjectURL(newProfilePhoto) : profilePhoto !== "" ? `${serverAdres}/profileImages/${profilePhoto}` : "/assets/images/default-user.png"}
                                width={100}
                            />
                            <div
                                className={classes.updateProfilePhoto}
                                style={{
                                    backgroundColor: colors.layer3
                                }}
                                onClick={() => {
                                    selectFile.click();
                                }}
                            >
                                <Icon
                                    color={colors.body}
                                    name="camera"
                                    size={20}
                                />
                            </div>
                        </div>
                    </div>
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? tcIdentityRef.current.focus() : null}
                        onChangeText={e => setFullName(e)}
                        title="Ad ve Soyad"
                        className={classes.input}
                        value={fullName}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? phoneRef.current.focus() : null}
                        onChangeText={e => setTcIdentity(e)}
                        className={classes.input}
                        referance={tcIdentityRef}
                        title="TC No"
                        value={tcIdentity}
                        type={"number"}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? phoneTwoRef.current.focus() : null}
                        title="Kiracı Telefon Numarası"
                        onChangeText={e => setPhoneNumber(e)}
                        className={classes.input}
                        referance={phoneRef}
                        onKeyUp={() => { }}
                        value={phoneNumber}
                        type={"number"}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? addressRef.current.focus() : null}
                        title="Kiracı Telefon Numarası 2"
                        onChangeText={e => setPhoneNumberTwo(e)}
                        className={classes.input}
                        referance={phoneTwoRef}
                        onKeyUp={() => { }}
                        value={phoneNumberTwo}
                        type={"number"}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? suretyFullNameRef.current.focus() : null}
                        onChangeText={e => setTenantAdress(e)}
                        title="Kiracı Adresi"
                        className={classes.input}
                        referance={addressRef}
                        onKeyUp={() => { }}
                        value={tenantAdress}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? suretyTcIdentityRef.current.focus() : null}
                        onChangeText={e => setSuretyFullName(e)}
                        referance={suretyFullNameRef}
                        className={classes.input}
                        title="Kefil Adı"
                        value={suretyFullName}
                        onKeyUp={() => { }}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? suretyPhoneNumberRef.current.focus() : null}
                        onChangeText={e => setSuretyTcIdentity(e)}
                        title="Kefil TC No"
                        className={classes.input}
                        referance={suretyTcIdentityRef}
                        onKeyUp={() => { }}
                        value={suretyTcIdentity}
                        type={"number"}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? suretyAdressRef.current.focus() : null}
                        onChangeText={e => setSuretyPhoneNumber(e)}
                        title="Kefil Telefon"
                        className={classes.input}
                        referance={suretyPhoneNumberRef}
                        onKeyUp={() => { }}
                        value={suretyPhoneNumber}
                        type={"number"}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? update() : null}
                        onChangeText={e => setSuretyAdress(e)}
                        referance={suretyAdressRef}
                        title="Kefil Adresi"
                        className={classes.input}
                        onKeyUp={() => { }}
                        value={suretyAdress}
                    />
                    <Button
                        value="Kiracıyı Sil"
                        color={colors.accent}
                        onClick={() => deleteTenantData()}
                        textColor={colors.contrastBody}
                        className={classes.deleteTenant}
                    />
                    <Button
                        value="Bilgileri Değiştir"
                        onClick={() => update()}
                    />
                </div>
            </div>
        </div>
    </div>;
};
export default injectSheet(stylesheet)(TenantDetail);