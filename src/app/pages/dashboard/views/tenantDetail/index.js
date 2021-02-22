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

const NewTenant = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;
    const [profilePhoto, setProfilePhoto] = useState("/assets/images/default-user.png");
    const [kefilFullName, setKefilFullName] = useState("");
    const [kefilAddress, setKefilAddress] = useState("");
    const [kefilPhone, setKefilPhone] = useState("");
    const [kefilIDNo, setKefilIDNo] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneTwo, setPhoneTwo] = useState("");
    const [phone, setPhone] = useState("");
    const [idNo, setIDNo] = useState("");

    const kefilFullNameRef = useRef();
    const kefilAddressRef = useRef();
    const kefilPhoneRef = useRef();
    const kefilIDNoRef = useRef();
    const phoneTwoRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();
    const idNoRef = useRef();

    const create = () => {
        console.log("Oluştur baham. :*");
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
                    <div
                        className={classes.profileContainer}
                    >
                        <div
                            className={classes.profile}
                        >
                            <img
                                src={profilePhoto}
                                width={100}
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
                                    size={20}
                                />
                            </div>
                        </div>
                    </div>
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? idNoRef.current.focus() : null}
                        onChangeText={e => setFullName(e)}
                        placeholder="Ad ve Soyad"
                        className={classes.input}
                        value={fullName}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? phoneRef.current.focus() : null}
                        onChangeText={e => setIDNo(e)}
                        className={classes.input}
                        referance={idNoRef}
                        placeholder="TC No"
                        value={idNo}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? phoneTwoRef.current.focus() : null}
                        placeholder="Kiracı Telefon Numarası"
                        onChangeText={e => setPhone(e)}
                        className={classes.input}
                        referance={phoneRef}
                        onKeyUp={() => {}}
                        value={phone}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? addressRef.current.focus() : null}
                        placeholder="Kiracı Telefon Numarası 2"
                        onChangeText={e => setPhoneTwo(e)}
                        className={classes.input}
                        referance={phoneTwoRef}
                        onKeyUp={() => {}}
                        value={phoneTwo}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? kefilFullNameRef.current.focus() : null}
                        onChangeText={e => setAddress(e)}
                        placeholder="Kiracı Adresi"
                        className={classes.input}
                        referance={addressRef}
                        onKeyUp={() => {}}
                        value={address}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? kefilIDNoRef.current.focus() : null}
                        onChangeText={e => setKefilFullName(e)}
                        referance={kefilFullNameRef}
                        className={classes.input}
                        placeholder="Kefil Adı"
                        value={kefilFullName}
                        onKeyUp={() => {}}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? kefilPhoneRef.current.focus() : null}
                        onChangeText={e => setKefilIDNo(e)}
                        placeholder="Kefil TC No"
                        className={classes.input}
                        referance={kefilIDNoRef}
                        onKeyUp={() => {}}
                        value={kefilIDNo}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? kefilAddressRef.current.focus() : null}
                        onChangeText={e => setKefilPhone(e)}
                        placeholder="Kefil Telefon"
                        className={classes.input}
                        referance={kefilPhoneRef}
                        onKeyUp={() => {}}
                        value={kefilPhone}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? create() : null}
                        onChangeText={e => setKefilAddress(e)}
                        referance={kefilAddressRef}
                        placeholder="Kefil Adresi"
                        className={classes.input}
                        onKeyUp={() => {}}
                        value={kefilAddress}
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