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
    getTenant,
} from "../../../../server/graphql";
import {
    serverAdres
} from "../../../../server/config";
import {
    fileSelector
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
    const [suretyPhoneNumber, setSuretyPhoneNumber] = useState(null);
    const [suretyTcIdentity, setSuretyTcIdentity] = useState(null);
    const [newProfilePhoto, setNewProfilePhoto] = useState(null);
    const [phoneNumberTwo, setPhoneNumberTwo] = useState(null);
    const [suretyFullName, setSuretyFullName] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [suretyAdress, setSuretyAdress] = useState(null);
    const [tenantAdress, setTenantAdress] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [tcIdentity, setTcIdentity] = useState(null);
    const [fullName, setFullName] = useState(null);

    const suretyPhoneNumberRef = useRef();
    const suretyTcIdentityRef = useRef();
    const suretyFullNameRef = useRef();
    const suretyAdressRef = useRef();
    const tcIdentityRef = useRef();
    const phoneTwoRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();

    useEffect(() => {
        getTenantData();
    }, []);
    selectFile.addEventListener("change", () => {
        const files = selectFile.files;
        if (files.length !== 0) {
            setNewProfilePhoto(files[0]);
        }
    });

    const update = () => {
        console.log("Oluştur baham. :*");
        const variables = {
        };
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
                        placeholder="Ad ve Soyad"
                        className={classes.input}
                        value={fullName}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? phoneRef.current.focus() : null}
                        onChangeText={e => setTcIdentity(e)}
                        className={classes.input}
                        referance={tcIdentityRef}
                        placeholder="TC No"
                        value={tcIdentity}
                        type={"number"}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? phoneTwoRef.current.focus() : null}
                        placeholder="Kiracı Telefon Numarası"
                        onChangeText={e => setPhoneNumber(e)}
                        className={classes.input}
                        referance={phoneRef}
                        onKeyUp={() => { }}
                        value={phoneNumber}
                        type={"number"}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? addressRef.current.focus() : null}
                        placeholder="Kiracı Telefon Numarası 2"
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
                        placeholder="Kiracı Adresi"
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
                        placeholder="Kefil Adı"
                        value={suretyFullName}
                        onKeyUp={() => { }}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? suretyPhoneNumberRef.current.focus() : null}
                        onChangeText={e => setSuretyTcIdentity(e)}
                        placeholder="Kefil TC No"
                        className={classes.input}
                        referance={suretyTcIdentityRef}
                        onKeyUp={() => { }}
                        value={suretyTcIdentity}
                        type={"number"}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? suretyAdressRef.current.focus() : null}
                        onChangeText={e => setSuretyPhoneNumber(e)}
                        placeholder="Kefil Telefon"
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
                        placeholder="Kefil Adresi"
                        className={classes.input}
                        onKeyUp={() => { }}
                        value={suretyAdress}
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