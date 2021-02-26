import React, {
    useEffect,
    useState,
    useRef
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import {
    DatePicker,
    SelectBox,
    TextInput,
    Button,
    Icon
} from '../../../../components';
import {
    typeValidMessageConverter,
    fixtureDataConverter,
    paymentPeriodTypes,
    numberOfRoomTypes,
    realEstateTypes,
    customAlert,    
    usageTypes
} from "../../../../helpers";
import useGlobalState from '../../../../context';
import moment from "moment";
import {
    client
} from '../../../../index';
import {
    updateRealEstate,
    deleteRealEstate,
    getRealEstate,
} from "../../../../server/graphql";
import FixtureCard from "../../components/fixtureCard";

const RealEstateDetail = ({
    refetch,
    classes,
    realEstateID
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [updateLoading, setUpdateLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const {
        colors
    } = globalState.theme;

    const [paymentPeriodDate, setPaymentPeriodDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [detailAdditionalInformation, setDetailAdditionalInformation] = useState("");
    const [detailManagerPhoneNumber, setDetailManagerPhoneNumber] = useState("");
    const [ownerManagerPhoneNumber, setOwnerManagerPhoneNumber] = useState("");
    const [paymentPeriodType, setPaymentPeriodType] = useState("monthly");
    const [selectedType, setSelectedType] = useState("apartment");
    const [ownerNameSurname, setOwnerNameSurname] = useState("");
    const [ownerTcIdentity, setOwnerTcIdentity] = useState("");
    const [rentalType, setRentalType] = useState("unattached");
    const [purposeOfUsage, setPurposeOfUsage] = useState("");
    const [numberOfRoom, setNumberOfRoom] = useState("");
    const [fixtureDatas, setFixtureDatas] = useState([]);
    const [electricity, setElectricity] = useState("");
    const [usageType, setUsageType] = useState("null");
    const [naturalGas, setNaturalGas] = useState("");
    const [detailDues, setDetailDues] = useState("");
    const [detailRent, setDetailRent] = useState("");
    const [ownerIban, setOwnerIban] = useState("");
    const [deposit, setDeposit] = useState("");
    const [adress, setAdress] = useState("");
    const [TCIPNo, setTCIPNo] = useState("");
    const [title, setTitle] = useState("");
    const [water, setWater] = useState("");

    const detailAdditionalInformationRef = useRef();
    const detailManagerPhoneNumberRef = useRef();
    const ownerManagerPhoneNumberRef = useRef();
    const paymentPeriodDateRef = useRef();
    const paymentPeriodTypeRef = useRef();
    const ownerNameSurnameRef = useRef();
    const ownerTcIdentityRef = useRef();
    const purposeOfUsageRef = useRef();
    const numberOfRoomRef = useRef();
    const electricityRef = useRef();
    const naturalGasRef = useRef();
    const detailRentRef = useRef();
    const detailDuesRef = useRef();
    const ownerIbanRef = useRef();
    const depozitRef = useRef();
    const addressRef = useRef();
    const depositRef = useRef();
    const TCIPNoRef = useRef();
    const waterRef = useRef();

    useEffect(() => {
        getRealEstateData();
    }, []);

    const update = async () => {
        const newFixtureData = await fixtureDataConverter(fixtureDatas);
        client.mutate({
            mutation: updateRealEstate,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: {
                realEstateID: realEstateID,
                type: selectedType,
                usageType: usageType,
                fixtureDatas: newFixtureData,
                title: title,
                adress: adress,
                rentalType: rentalType,
                electricity: electricity,
                water: water,
                naturalGas: naturalGas,
                TCIPNo: TCIPNo,
                ownerNameSurname: ownerNameSurname,
                ownerManagerPhoneNumber: ownerManagerPhoneNumber,
                ownerTcIdentity: ownerTcIdentity,
                ownerIban: ownerIban,
                detailDues: detailDues,
                detailManagerPhoneNumber: detailManagerPhoneNumber,
                detailAdditionalInformation: detailAdditionalInformation,
                numberOfRoom: numberOfRoom,
                purposeOfUsage: purposeOfUsage,
                detailRent: detailRent !== "" && detailRent.length !== 0 ? detailRent : "0",
                paymentPeriod: {
                    type: paymentPeriodType,
                    date: paymentPeriodDate
                },
                deposit: deposit
            }
        }).then(async (res) => {
            setUpdateLoading(false);
            if (res.data.updateRealEstate.code === 200) {
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
                const errorMessage = await typeValidMessageConverter({
                    message: res.data.updateRealEstate.message,
                    title: "Emlak"
                });
                customAlert({
                    title: "Hata",
                    message: errorMessage
                });
            }
        });
    };

    const getRealEstateData = () => {
        client.query({
            query: getRealEstate,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: {
                realEstateID: realEstateID
            },
            fetchPolicy: "network-only"
        }).then(res => {
            if (res.data.getRealEstate.response.code === 200) {
                const realEstateData = res.data.getRealEstate.data;
                setSelectedType(realEstateData.type);
                setUsageType(realEstateData.usageType);
                setFixtureDatas(realEstateData.fixtureDatas);
                setTitle(realEstateData.title);
                setAdress(realEstateData.adress);
                setElectricity(realEstateData.electricity);
                setWater(realEstateData.water);
                setNaturalGas(realEstateData.naturalGas);
                setTCIPNo(realEstateData.TCIPNo);
                setOwnerNameSurname(realEstateData.ownerNameSurname);
                setOwnerManagerPhoneNumber(realEstateData.ownerManagerPhoneNumber);
                setOwnerTcIdentity(realEstateData.ownerTcIdentity);
                setOwnerIban(realEstateData.ownerIban);
                setDetailDues(realEstateData.detailDues);
                setDetailManagerPhoneNumber(realEstateData.detailManagerPhoneNumber);
                setDetailAdditionalInformation(realEstateData.detailAdditionalInformation);
                setNumberOfRoom(realEstateData.numberOfRoom);
                setPurposeOfUsage(realEstateData.purposeOfUsage);
                setDetailRent(realEstateData.detailRent);
                setPaymentPeriodType(realEstateData.paymentPeriod.type);
                setPaymentPeriodDate(moment(new Date(realEstateData.paymentPeriod.date)).format("YYYY-MM-DD"));
                setDeposit(realEstateData.deposit !== null
                    ? realEstateData.deposit
                    : '0');
                setRentalType(realEstateData.rentalType.length !== 0 &&
                    realEstateData.rentalType[0].status &&
                    realEstateData.rentalType[0].status === 'continuation'
                    ? realEstateData.rentalType[0].status
                    : 'unattached');
                setLoading(false);

            }
            else {
                customAlert({
                    title: "Hata",
                    message: res.data.getRealEstate.response.message
                });
            }
        }).catch(e => {
            customAlert({
                title: "Hata",
                message: e
            });
        });
    };

    const deleteRealEstateData = () => {
        customAlert({
            message: "Emlak Silinsinmi?",
            onPressOkey: () => {
                client.mutate({
                    mutation: deleteRealEstate,
                    context: {
                        headers: {
                            "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                        }
                    },
                    variables: {
                        realEstateID: realEstateID
                    }
                }).then((res) => {
                    if (res.data.deleteRealEstate.code === 200) {
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
                        customAlert({
                            title: "Hata",
                            message: res.data.deleteRealEstate.message
                        });
                    }
                });
            }
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
                Emlak Güncelle
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
                        realEstateTypes.map((item, index) => {
                            return <div
                                key={index}
                                className={classes.switchObject}
                                style={{
                                    backgroundColor: selectedType === item.value ? colors.primary : colors.layer1,
                                    borderBottomRightRadius: index === realEstateTypes.length - 1 ? 10 : null,
                                    borderTopRightRadius: index === realEstateTypes.length - 1 ? 10 : null,
                                    fontWeight: selectedType === item.value ? 800 : 600,
                                    borderBottomLeftRadius: index === 0 ? 10 : null,
                                    borderTopLeftRadius: index === 0 ? 10 : null
                                }}
                                onClick={() => setSelectedType(item.value)}
                            >
                                {item.label}
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
                    {
                        selectedType === "other" ? <SelectBox
                            datas={usageTypes}
                            title={"Kullanım Türü"}
                            onChangeValue={(val) => setUsageType(val)}
                            value={usageType}
                            className={classes.useType}
                        /> : null
                    }
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? addressRef.current.focus() : null}
                        onChangeText={e => setTitle(e)}
                        title="Başlık"
                        className={classes.input}
                        value={title}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? electricityRef.current.focus() : null}
                        onChangeText={e => setAdress(e)}
                        className={classes.input}
                        referance={addressRef}
                        title="Adres"
                        value={adress}
                    />

                    {
                        selectedType !== "other" ? < div
                            className={classes.tableCell}
                        >
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
                            </div >
                            <TextInput
                                onKeyUp={e => e.keyCode === 13 ? waterRef.current.focus() : null}
                                title="Elektrik"
                                onChangeText={e => setElectricity(e)}
                                className={classes.input}
                                referance={electricityRef}
                                onKeyUp={() => { }}
                                value={electricity}
                            />
                            <TextInput
                                onKeyUp={e => e.keyCode === 13 ? naturalGasRef.current.focus() : null}
                                title="Su"
                                onChangeText={e => setWater(e)}
                                className={classes.input}
                                referance={waterRef}
                                onKeyUp={() => { }}
                                value={water}
                            />
                            <TextInput
                                onKeyUp={e => e.keyCode === 13 ? TCIPNoRef.current.focus() : null}
                                onChangeText={e => setNaturalGas(e)}
                                title="Doğal Gaz"
                                className={classes.input}
                                referance={naturalGasRef}
                                onKeyUp={() => { }}
                                value={naturalGas}
                            />
                            <TextInput
                                onKeyUp={e => e.keyCode === 13 ? ownerNameSurnameRef.current.focus() : null}
                                onChangeText={e => setTCIPNo(e)}
                                className={classes.input}
                                title="Dask No"
                                referance={TCIPNoRef}
                                onKeyUp={() => { }}
                                value={TCIPNo}
                            />
                        </div> : null
                    }

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
                        onKeyUp={e => e.keyCode === 13 ? ownerManagerPhoneNumberRef.current.focus() : null}
                        onChangeText={e => setOwnerNameSurname(e)}
                        title="Ad Soyad"
                        className={classes.input}
                        referance={ownerNameSurnameRef}
                        onKeyUp={() => { }}
                        value={ownerNameSurname}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? ownerTcIdentityRef.current.focus() : null}
                        onChangeText={e => setOwnerManagerPhoneNumber(e)}
                        referance={ownerManagerPhoneNumberRef}
                        title="Telefon No"
                        className={classes.input}
                        value={ownerManagerPhoneNumber}
                        onKeyUp={() => { }}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? ownerIbanRef.current.focus() : null}
                        onChangeText={e => setOwnerTcIdentity(e)}
                        referance={ownerTcIdentityRef}
                        title="TC No"
                        className={classes.input}
                        onKeyUp={() => { }}
                        value={ownerTcIdentity}
                    />
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? detailDuesRef.current.focus() : null}
                        onChangeText={e => setOwnerIban(e)}
                        referance={ownerIbanRef}
                        title="IBAN"
                        className={classes.input}
                        onKeyUp={() => { }}
                        value={ownerIban}
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
                    {
                        selectedType !== "other" ? <TextInput
                            onKeyUp={e => e.keyCode === 13 ? depozitRef.current.focus() : null}
                            onChangeText={e => setDetailDues(e)}
                            referance={detailDuesRef}
                            title="Aidat"
                            className={classes.input}
                            onKeyUp={() => { }}
                            value={detailDues}
                        /> : null
                    }
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? detailManagerPhoneNumberRef.current.focus() : null}
                        onChangeText={e => setDeposit(e)}
                        referance={depozitRef}
                        title="Depozito"
                        className={classes.input}
                        onKeyUp={() => { }}
                        value={deposit}
                    />
                    {
                        selectedType !== "other" ? <TextInput
                            onKeyUp={e => e.keyCode === 13 ? detailAdditionalInformationRef.current.focus() : null}
                            onChangeText={e => setDetailManagerPhoneNumber(e)}
                            referance={detailManagerPhoneNumberRef}
                            title="Yönetici Telefon No"
                            className={classes.input}
                            onKeyUp={() => { }}
                            value={detailManagerPhoneNumber}
                        /> : null
                    }
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? purposeOfUsageRef.current.focus() : null}
                        onChangeText={e => setDetailAdditionalInformation(e)}
                        referance={detailAdditionalInformationRef}
                        title={selectedType !== "other" ? "Ek Bilgiler" : "Açıklama"}
                        className={classes.input}
                        onKeyUp={() => { }}
                        value={detailAdditionalInformation}
                    />
                    {
                        selectedType === "apartment" ? <SelectBox
                            datas={numberOfRoomTypes}
                            value={numberOfRoom}
                            onChangeValue={(type) => setNumberOfRoom(type)}
                            title={"Oda Sayısı"}
                            className={classes.roomCount}
                        /> : null
                    }
                    {
                        selectedType !== "other" ? <TextInput
                            onKeyUp={e => e.keyCode === 13 ? detailRentRef.current.focus() : null}
                            onChangeText={e => setPurposeOfUsage(e)}
                            referance={purposeOfUsageRef}
                            title="Kullanım Amacı"
                            className={classes.input}
                            onKeyUp={() => { }}
                            value={purposeOfUsage}
                        /> : null
                    }
                    <TextInput
                        onKeyUp={e => e.keyCode === 13 ? update() : null}
                        onChangeText={e => setDetailRent(e)}
                        referance={detailRentRef}
                        title="Kira Bedeli"
                        className={classes.input}
                        onKeyUp={() => { }}
                        value={detailRent}
                    />
                    <div
                        className={classes.switchContainer}
                    >
                        {
                            paymentPeriodTypes.map((item, index) => {
                                return <div
                                    key={index}
                                    className={classes.switchObject}
                                    style={{
                                        backgroundColor: paymentPeriodType === item.value ? colors.primary : colors.layer1,
                                        borderBottomRightRadius: index === paymentPeriodTypes.length - 1 ? 10 : null,
                                        borderTopRightRadius: index === paymentPeriodTypes.length - 1 ? 10 : null,
                                        fontWeight: paymentPeriodType === item.value ? 800 : 600,
                                        borderBottomLeftRadius: index === 0 ? 10 : null,
                                        borderTopLeftRadius: index === 0 ? 10 : null,
                                        width: "50%"
                                    }}
                                    onClick={() => setPaymentPeriodType(item.value)}
                                >
                                    {item.label}
                                </div>;
                            })
                        }
                    </div>
                    <DatePicker
                        title={"Ödeme Periyodu Zamanı"}
                        value={paymentPeriodDate}
                        onChangeValue={(val) => setPaymentPeriodDate(val)}
                        className={classes.periodDate}
                    />
                    <div
                        className={classes.description}
                    >
                        Her periyodun tamamlanmasına 3 gün kala size hatırlatma bildirimi gönderilecektir.
                    </div>
                    {
                        selectedType !== "other" ? <FixtureCard
                            datas={fixtureDatas}
                            setDatas={(val) => setFixtureDatas(val)}
                        /> : null
                    } 
                    <Button
                        value="Emlağı Sil"
                        color={colors.accent}
                        textColor={colors.contrastBody}
                        onClick={() => deleteRealEstateData()}
                        className={classes.deleteRealEstate}
                        disabled={updateLoading}
                    />
                    <Button
                        value="Güncelle"
                        onClick={() => {
                            setUpdateLoading(true);
                            update();
                        }}
                        disabled={updateLoading}
                    />
                </div>
            </div>
        </div>
    </div>;
};
export default injectSheet(stylesheet)(RealEstateDetail);