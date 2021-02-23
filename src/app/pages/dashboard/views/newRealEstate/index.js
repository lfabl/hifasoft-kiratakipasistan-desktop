import React, {
    useState,
    useRef
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import {
    TextInput,
    Button,
    Icon
} from '../../../../components';
import useGlobalState from '../../../../context';

const REAL_ESTATE_TYPES = [
    {
        title: "Dükkan",
        name: "store"
    },
    {
        title: "Daire",
        name: "apartment"
    },
    {
        title: "Diğer",
        name: "other"
    }
];
const REAL_ESTATE_PERIOD_TYPES = [
    {
        title: "Aylık",
        name: "monthly"
    },
    {
        title: "Yıllık",
        name: "yearly"
    }
];

const NewRealEstate = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;
    const [selectedPeriod, setSelectedPeriod] = useState("monthly");
    const [malsahibiFullName, setMalsahibiFullName] = useState("");
    const [selectedType, setSelectedType] = useState("apartment");
    const [adminPhoneNumber, setAdminPhoneNumber] = useState("");
    const [malsahibiPhone, setMalsahibiPhone] = useState("");
    const [malsahibiIBAN, setMalsahibiIBAN] = useState("");
    const [malsahibiIDNo, setMalsahibiIDNo] = useState("");
    const [kullanimamaci, setKullanimamaci] = useState("");
    const [ekbilgiler, setEkbilgiler] = useState("");
    const [kirabedeli, setKirabedeli] = useState("");
    const [roomCount, setRoomCount] = useState("");
    const [elektrik, setElektrik] = useState("");
    const [dogalgaz, setDogalgaz] = useState("");
    const [depozito, setDepozito] = useState("");
    const [address, setAddress] = useState("");
    const [title, setTitle] = useState("");
    const [water, setWater] = useState("");
    const [aidat, setAidat] = useState("");
    const [dask, setDask] = useState("");

    const malsahibiFullNameRef = useRef();
    const adminPhoneNumberRef = useRef();
    const malsahibiPhoneRef = useRef();
    const selectedPeriodRef = useRef();
    const malsahibiIBANRef = useRef();
    const malsahibiIDNoRef = useRef();
    const kullanimamaciRef = useRef();
    const kirabedeliRef = useRef();
    const ekbilgilerRef = useRef();
    const roomCountRef = useRef();
    const depozitoRef = useRef();
    const elektrikRef = useRef();
    const dogalgazRef = useRef();
    const addressRef = useRef();
    const waterRef = useRef();
    const aidatRef = useRef();
    const daskRef = useRef();

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
                Yeni Emlak Oluştur
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
                    className={classes.switchContainer}
                >
                    {
                        REAL_ESTATE_TYPES.map((item, index) => {
                            return <div
                                key={index}
                                className={classes.switchObject}
                                style={{
                                    backgroundColor: selectedType === item.name ? colors.primary : colors.layer1,
                                    borderBottomRightRadius: index === REAL_ESTATE_TYPES.length - 1 ? 10 : null,
                                    borderTopRightRadius: index === REAL_ESTATE_TYPES.length - 1 ? 10 : null,
                                    fontWeight: selectedType === item.name ? 800 : 600,
                                    borderBottomLeftRadius: index === 0 ? 10 : null,
                                    borderTopLeftRadius: index === 0 ? 10 : null
                                }}
                                onClick={() => setSelectedType(item.name)}
                            >
                                {item.title}
                            </div>;
                        })
                    }
                </div>
                <div
                    className={classes.tableCell}
                >
                    <div
                        className={classes.subTitle}
                    >
                        Genel Bilgiler
                    </div>
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? addressRef.current.focus() : null}
                        onChangeText={e => setTitle(e)}
                        placeholder="Başlık"
                        className={classes.input}
                        value={title}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? elektrik.current.focus() : null}
                        onChangeText={e => setAddress(e)}
                        className={classes.input}
                        referance={addressRef}
                        placeholder="Adres"
                        value={address}
                    />
                    <div
                        className={classes.seperator}
                        style={{
                            backgroundColor: colors.seperator
                        }}
                    ></div>
                    <div
                        className={classes.subTitle}
                    >
                        Tesisat / Dask No
                    </div>
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? waterRef.current.focus() : null}
                        placeholder="Elektrik"
                        onChangeText={e => setElektrik(e)}
                        className={classes.input}
                        referance={elektrikRef}
                        onKeyUp={() => {}}
                        value={elektrik}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? dogalgazRef.current.focus() : null}
                        placeholder="Su"
                        onChangeText={e => setWater(e)}
                        className={classes.input}
                        referance={waterRef}
                        onKeyUp={() => {}}
                        value={water}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? daskRef.current.focus() : null}
                        onChangeText={e => setDogalgaz(e)}
                        placeholder="Doğal Gaz"
                        className={classes.input}
                        referance={dogalgazRef}
                        onKeyUp={() => {}}
                        value={dogalgaz}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? malsahibiFullNameRef.current.focus() : null}
                        onChangeText={e => setDask(e)}
                        className={classes.input}
                        placeholder="Fask No"
                        referance={daskRef}
                        onKeyUp={() => {}}
                        value={dask}
                    />
                    <div
                        className={classes.seperator}
                        style={{
                            backgroundColor: colors.seperator
                        }}
                    ></div>
                    <div
                        className={classes.subTitle}
                    >
                        Mal Sahibi Bilgileri
                    </div>
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? malsahibiPhoneRef.current.focus() : null}
                        onChangeText={e => setMalsahibiFullName(e)}
                        placeholder="Ad Soyad"
                        className={classes.input}
                        referance={malsahibiFullNameRef}
                        onKeyUp={() => {}}
                        value={malsahibiFullName}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? malsahibiIDNoRef.current.focus() : null}
                        onChangeText={e => setMalsahibiPhone(e)}
                        referance={malsahibiPhoneRef}
                        placeholder="Telefon No"
                        className={classes.input}
                        value={malsahibiPhone}
                        onKeyUp={() => {}}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? malsahibiIBANRef.current.focus() : null}
                        onChangeText={e => setMalsahibiIDNo(e)}
                        referance={malsahibiIDNoRef}
                        placeholder="TC No"
                        className={classes.input}
                        onKeyUp={() => {}}
                        value={malsahibiIDNo}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? aidatRef.current.focus() : null}
                        onChangeText={e => setMalsahibiIBAN(e)}
                        referance={malsahibiIBANRef}
                        placeholder="IBAN"
                        className={classes.input}
                        onKeyUp={() => {}}
                        value={malsahibiIBAN}
                    />
                    <div
                        className={classes.seperator}
                        style={{
                            backgroundColor: colors.seperator
                        }}
                    ></div>
                    <div
                        className={classes.subTitle}
                    >
                        Detaylar
                    </div>
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? depozitoRef.current.focus() : null}
                        onChangeText={e => setAidat(e)}
                        referance={aidatRef}
                        placeholder="Aidat"
                        className={classes.input}
                        onKeyUp={() => {}}
                        value={aidat}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? adminPhoneNumber.current.focus() : null}
                        onChangeText={e => setDepozito(e)}
                        referance={depozitoRef}
                        placeholder="Depozito"
                        className={classes.input}
                        onKeyUp={() => {}}
                        value={depozito}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? ekbilgilerRef.current.focus() : null}
                        onChangeText={e => setAdminPhoneNumber(e)}
                        referance={adminPhoneNumberRef}
                        placeholder="Yönetici Telefon No"
                        className={classes.input}
                        onKeyUp={() => {}}
                        value={adminPhoneNumber}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? roomCountRef.current.focus() : null}
                        onChangeText={e => setEkbilgiler(e)}
                        referance={ekbilgilerRef}
                        placeholder="Ek Bilgiler"
                        className={classes.input}
                        onKeyUp={() => {}}
                        value={ekbilgiler}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? kullanimamaciRef.current.focus() : null}
                        onChangeText={e => setRoomCount(e)}
                        referance={roomCountRef}
                        placeholder="Ek Bilgiler"
                        className={classes.input}
                        onKeyUp={() => {}}
                        value={roomCount}
                    />
                    <div>{/*ismail buraya selectbox KİRA BEDELİ*/}</div>
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? create() : null}
                        onChangeText={e => setKirabedeli(e)}
                        referance={kirabedeliRef}
                        placeholder="Ek Bilgiler"
                        className={classes.input}
                        onKeyUp={() => {}}
                        value={kirabedeli}
                    />
                    <div
                        className={classes.switchContainer}
                    >
                        {
                            REAL_ESTATE_PERIOD_TYPES.map((item, index) => {
                                return <div
                                    key={index}
                                    className={classes.switchObject}
                                    style={{
                                        backgroundColor: selectedPeriod === item.name ? colors.primary : colors.layer1,
                                        borderBottomRightRadius: index === REAL_ESTATE_PERIOD_TYPES.length - 1 ? 10 : null,
                                        borderTopRightRadius: index === REAL_ESTATE_PERIOD_TYPES.length - 1 ? 10 : null,
                                        fontWeight: selectedPeriod === item.name ? 800 : 600,
                                        borderBottomLeftRadius: index === 0 ? 10 : null,
                                        borderTopLeftRadius: index === 0 ? 10 : null,
                                        width: "50%"
                                    }}
                                    onClick={() => setSelectedPeriod(item.name)}
                                >
                                    {item.title}
                                </div>;
                            })
                        }
                    </div>
                    <div>{/*ismail buraya date piker :D ÖDEME PERİYODU ZAMANI*/}</div>
                    <div
                        className={classes.description}
                    >
                        Her periyodun tamamlanmasına 3 gün kala size hatırlatma bildirimi gönderilecektir.
                    </div>
                    <Button
                        value="Oluştur"
                        onClick={() => create()}
                    />
                </div>
            </div>
        </div>
    </div>;
};
export default injectSheet(stylesheet)(NewRealEstate);