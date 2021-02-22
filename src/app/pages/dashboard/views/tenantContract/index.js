import React, {
    useState,
    useEffect
} from "react";
import injectsheet from "react-jss";
import stylesheet from './stylesheet';
import {
    DatePicker,
    TextInput,
    SelectBox,
    TypeSwitch
} from "../../../../components";
import useGlobalState from '../../../../context';
import {
    client
} from '../../../../index';
import {
    selectBoxTypeConverter,
    contractPeriodTypes,
    paymentPeriodTypes,
    paymentTypes
} from "../../../../helpers";
import {
    getAvailableRealEstatesForContract,
    contractControl,
    getRealEstate,
    newContract as newTenantContract,
    deleteContract as deleteTenantContract,
    getAllRealEstates
} from "../../../../server/graphql";
import moment from "moment";

const TenantContract = ({
    classes,
    id
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [loading, setLoading] = useState(true);
    const [allTenants, setAllTenants] = useState([]);
    const [selectRealEstateID, setSelectRealEsateteID] = useState("");
    const [selectRealEstateStatus, setSelectRealEstateStatus] = useState(false);
    const [rentalDate, setRentalDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [contractPeriod, setContractPeriod] = useState("0");
    const [rentalPrice, setRentalPrice] = useState(null);
    const [paymentType, setPaymentType] = useState("cash");
    const [paymentPeriodType, setPaymentPeriodType] = useState("monthly");
    const [paymentPeriodDate, setPaymentPeriodDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const {
        colors
    } = globalState.theme;

    const deteContract = () => {
        client.mutate({
            mutation: deleteTenantContract,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: {
                tenantID: id,
                realEstateID: ""
            },
            refetchQueries: [{
                query: getAllRealEstates
            }]
        }).then((res) => {
            console.log(res);
            if (res.data.deleteContract.code === 200) {
                /* Sözleşme başarı ile oluşturulmuştur */
            }
            else {
                /* Bir hata oluştur */
            }
        });
    };
    const newContract = (newData) => {
        client.mutate({
            mutation: newTenantContract,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: newData,
            refetchQueries: [{
                query: getAllRealEstates
            }]
        }).then((res) => {
            console.log(res);
            if (res.data.newContract.code === 200) {
                /* Sözleşme başarı ile oluşturulmuştur */
            }
            else {
                /* Bir hata oluştur */
            }
        });
    };
    const reset = () => {
        setLoading(true);
        setSelectRealEsateteID("");
        setRentalDate(moment(new Date()).format("YYYY-MM-DD"));
        setContractPeriod("0");
        setRentalPrice(null);
        setPaymentType("cash");
        setPaymentPeriodType("monthly");
        setPaymentPeriodDate(moment(new Date()).format("YYYY-MM-DD"));
    };
    const getEstateData = () => {
        client.query({
            query: getRealEstate,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: {
                realEstateID: selectRealEstateID
            },
        }).then(async (res) => {
            if (res.data.getRealEstate.response.code === 200) {
                const data = res.data.getRealEstate.data;
                setRentalPrice(data.detailRent);
                setPaymentPeriodType(data.paymentPeriod.type);
                setPaymentPeriodDate(moment(data.paymentPeriod.date).format("YYYY-MM-DD"));
                setLoading(false);
                setSelectRealEstateStatus(true);
            }
            else {
                setLoading(false);
            }
        }).catch(e => {
            setLoading(false);
        });
    };
    const getRealEstates = () => {
        client.query({
            query: getAvailableRealEstatesForContract,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: {
                realEstateID: id
            },
        }).then(async (res) => {
            if (res.data.getAvailableRealEstatesForContract.response.code === 200) {
                const converterdTenants = await selectBoxTypeConverter({
                    datas: res.data.getAvailableRealEstatesForContract.data,
                    valuePropName: "id",
                    labelPropName: "title",
                });
                setAllTenants([{
                    value: "",
                    label: "Lütfen emlak Seçiniz"
                }, ...converterdTenants]);
                setLoading(false);

            }
            else {
                setLoading(false);
            }
        }).catch(e => {
            setLoading(false);
        });
    };
    const getContractControl = () => {
        client.query({
            query: contractControl,
            variables: {
                tenantID: id
            },
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            }
        }).then(res => {
            const status = res.data.contractControl.code !== 200 ? false : true;
            if (status === false) {
                setLoading(false);
                setGlobalState({
                    modal: {
                        isActive: true,
                        loading: false,
                        type: "dialog",
                        data: {
                            title: "Sözleşme Iptali!",
                            message: "Bu işlem sözleşmeyi iptal edecektir onaylıyormusunuz ?"
                        },
                        onSubmit: {
                            text: "Tamam",
                            action: () => {
                                console.log("Tamama basıldı");
                                deteContract();
                            }
                        },
                        onCancel: {
                            text: "İptal",
                            action: () => {
                                reset();
                            }
                        }
                    }
                });
            }
            else {
                getRealEstates();
            }
        }).catch(e => {
            setLoading(false);
        });
    };

    useEffect(() => {
        getContractControl();
    }, []);

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
        {
            !selectRealEstateStatus ? <div>
                <div
                    className={classes.title}
                >
                    Lütfen Emlak Seçiniz
                </div>
                <SelectBox
                    datas={allTenants}
                    value={selectRealEstateID}
                    onChangeValue={(val) => setSelectRealEsateteID(val)}
                    title={"Emlak Seç"}
                />
            </div> : <div>
                <DatePicker
                    title={"Kiralama Tarihi"}
                    value={rentalDate}
                    onChangeValue={(val) => setRentalDate(val)}
                />
                <SelectBox
                    datas={contractPeriodTypes}
                    value={contractPeriod}
                    onChangeValue={(val) => setContractPeriod(val)}
                    title={"Sözleşme Süresi"}
                />
                <TextInput
                    value={rentalPrice}
                    onChangeText={e => setRentalPrice(e)}
                    placeholder="Kiralama Fiyatı"
                    type={"number"}
                />
                <SelectBox
                    datas={paymentTypes}
                    value={paymentType}
                    onChangeValue={(val) => setPaymentType(val)}
                    title={"Ödeme Türü"}
                />
                <TypeSwitch
                    types={paymentPeriodTypes}
                    value={paymentPeriodType}
                    onChangeValue={(type) => setPaymentPeriodType(type)}
                    selectColor={"#30D5C8"}
                    unSelectColor={"#F9F9F9"}
                />
                <DatePicker
                    title={"Ödeme Periyodu Zamanı"}
                    value={paymentPeriodDate}
                    onChangeValue={(val) => setPaymentPeriodDate(val)}
                />
                <div>Her periyodun tamamlanmasına 3 gün kala size hatırlatma bildirimi gönderilecektir.</div>
            </div>
        }

        <div
            className={classes.buttons}
        >

            <div
                className={[
                    classes.button,
                    classes.cancel
                ].join(" ")}
                onClick={() => {
                    setGlobalState({
                        modal: {
                            isActive: false,
                            loading: false,
                            type: "children",
                            children: null
                        }
                    });
                }}
            >
                Iptal
            </div>

            <div
                className={[
                    classes.button,
                    classes.submit
                ].join(" ")}
                onClick={() => {
                    if (!selectRealEstateStatus) {
                        if (selectRealEstateID !== "") {
                            setLoading(true);
                            getEstateData();
                        }
                    }
                    else {
                        /* Yeni sözleşme oluşturmak için  */
                        if (
                            id !== "" &&
                            selectRealEstateID !== "" &&
                            rentalDate !== "" &&
                            contractPeriod !== "" &&
                            rentalPrice !== "" &&
                            paymentType !== "" &&
                            paymentPeriodType !== "" &&
                            paymentPeriodDate !== ""
                        ) {
                            const newContractData = {
                                tenantID: id,
                                realEstateID:  selectRealEstateID ,
                                rentalDate: rentalDate,
                                contractPeriod: contractPeriod,
                                rentalPrice: rentalPrice,
                                paymentType: paymentType,
                                paymentPeriod: {
                                    type: paymentPeriodType,
                                    date: paymentPeriodDate
                                }
                            };
                            newContract(newContractData);

                        }
                    }
                }}
            >
                {selectRealEstateStatus ? "Onayla" : "Devam"}
            </div>
        </div>
    </div >;
};

export default injectsheet(stylesheet)(TenantContract);