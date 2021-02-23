import React, {
    useState,
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
    newTenant
} from "../../../../server/graphql";

const NewTenant = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;
    const [suretyPhoneNumber, setSuretyPhoneNumber] = useState("");
    const [suretyTcIdentity, setSuretyTcIdentity] = useState("");
    const [phoneNumberTwo, setPhoneNumberTwo] = useState("");
    const [suretyFullName, setSuretyFullName] = useState("");
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

    const create = () => {
        client.mutate({
            mutation: newTenant,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: {
                suretyPhoneNumber: suretyPhoneNumber,
                suretyTcIdentity: suretyTcIdentity,
                suretyFullName: suretyFullName,
                phoneNumber2: phoneNumberTwo,
                tenantAdress: tenantAdress,
                suretyAdress: suretyAdress,
                phoneNumber1: phoneNumber,
                tcIdentity: tcIdentity,
                profileImageName: "",
                fullName: fullName,
            },
        }).then((res) => {
            if (res.data.newTenant.code === 200) {
                setGlobalState({
                    modal: {
                        isActive: true,
                        loading: false,
                        dialog: true,
                        data: {
                            title: "Başarılı!",
                            message: "Başarılı ile kiracı oluşturulmuştur."
                        }
                    }
                });
            }
            else {
                /* Hata var ise yapılacaklar. */
            }
        });
    };

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
                Yeni Kiracı Oluştur
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
                        onKeyUp={e => e.keyCode === 13 ? create() : null}
                        onChangeText={e => setSuretyAdress(e)}
                        referance={suretyAdressRef}
                        placeholder="Kefil Adresi"
                        className={classes.input}
                        onKeyUp={() => { }}
                        value={suretyAdress}
                    />
                    <Button
                        value="Oluştur"
                        onClick={() => create()}
                    />
                </div>
            </div>
        </div>
    </div>;
};
export default injectSheet(stylesheet)(NewTenant);