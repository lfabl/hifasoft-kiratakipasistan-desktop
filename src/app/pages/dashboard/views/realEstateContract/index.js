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
    getAvailableTenantsForContract,
    contractControl,
    getRealEstate,
    newContract as newRealEstateContract,
    deleteContract as deleteRealEstateContract,
    getAllRealEstates
} from "../../../../server/graphql";
import moment from "moment";

const RealEstateContract = ({
    classes,
    id,
    refetch
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [loading, setLoading] = useState(true);
    const [allTenants, setAllTenants] = useState([]);
    const [selectTenanatID, setSelectTenantID] = useState("");
    const [selectTenantStatus, setSelectTenantStatus] = useState(false);
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
            mutation: deleteRealEstateContract,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: {
                tenantID: "",
                realEstateID: id
            },

        }).then((res) => {
            console.log(res);
            if (res.data.deleteContract.code === 200) {
                refetch();
                /* Sözleşme başarı ile silinmiştir */
            }
            else {
                /* Bir hata oluştur */
            }
        });
    };
    
    const newContract = (newData) => {
        client.mutate({
            mutation: newRealEstateContract,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: newData,
        }).then((res) => {
            if (res.data.newContract.code === 200) {
                refetch();

                /* Sözleşme başarı ile oluşturulmuştur */
            }
            else {
                /* Bir hata oluştur */
            }
        });
    };

    const reset = () => {
        setLoading(true);
        setSelectTenantID("");
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
                realEstateID: id
            },
            fetchPolicy: "network-only"            
        }).then(async (res) => {
            if (res.data.getRealEstate.response.code === 200) {
                const data = res.data.getRealEstate.data;
                setRentalPrice(data.detailRent);
                setPaymentPeriodType(data.paymentPeriod.type);
                setPaymentPeriodDate(moment(data.paymentPeriod.date).format("YYYY-MM-DD"));
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        }).catch(e => {
            setLoading(false);
        });
    };

    const getTenants = () => {
        client.query({
            query: getAvailableTenantsForContract,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            variables: {
                realEstateID: id
            },
            fetchPolicy: "network-only"            
        }).then(async (res) => {
            if (res.data.getAvailableTenantsForContract.response.code === 200) {
                const converterdTenants = await selectBoxTypeConverter({
                    datas: res.data.getAvailableTenantsForContract.data,
                    valuePropName: "id",
                    labelPropName: "fullName",
                });
                setAllTenants([{
                    value: "",
                    label: "Lütfen kiracı Seçiniz"
                }, ...converterdTenants]);
                getEstateData();
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
                realEstateID: id
            },
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            fetchPolicy: "network-only"            
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
                getTenants();
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
            !selectTenantStatus ? <div>
                <div
                    className={classes.title}
                >
                    Lütfen Kiracı Seçiniz
                </div>
                <SelectBox
                    datas={allTenants}
                    value={selectTenanatID}
                    onChangeValue={(val) => setSelectTenantID(val)}
                    title="Kiracı Seç"
                    className={classes.item}
                />
            </div> : <div>
                <DatePicker
                    title="Kiralama Tarihi"
                    value={rentalDate}
                    onChangeValue={(val) => setRentalDate(val)}
                    className={classes.item}
                />
                <SelectBox
                    datas={contractPeriodTypes}
                    value={contractPeriod}
                    onChangeValue={(val) => setContractPeriod(val)}
                    title="Sözleşme Süresi"
                    className={classes.item}
                />
                <TextInput
                    value={rentalPrice}
                    onChangeText={e => setRentalPrice(e)}
                    title="Kiralama Fiyatı"
                    type="number"
                    className={classes.item}
                />
                <SelectBox
                    datas={paymentTypes}
                    value={paymentType}
                    onChangeValue={(val) => setPaymentType(val)}
                    title="Ödeme Türü"
                    className={classes.item}
                />
                <TypeSwitch
                    types={paymentPeriodTypes}
                    value={paymentPeriodType}
                    onChangeValue={(type) => setPaymentPeriodType(type)}
                    selectColor={"#30D5C8"}
                    unSelectColor={"#F9F9F9"}
                    className={classes.item}
                />
                <DatePicker
                    title="Ödeme Periyodu Zamanı"
                    value={paymentPeriodDate}
                    onChangeValue={(val) => setPaymentPeriodDate(val)}
                    className={classes.item}
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
                    if (!selectTenantStatus) {
                        if (selectTenanatID !== "") {
                            setSelectTenantStatus(true);
                        }
                    }
                    else {
                        /* Yeni sözleşme oluşturmak için  */
                        if (
                            id !== "" &&
                            selectTenanatID !== "" &&
                            rentalDate !== "" &&
                            contractPeriod !== "" &&
                            rentalPrice !== "" &&
                            paymentType !== "" &&
                            paymentPeriodType !== "" &&
                            paymentPeriodDate !== ""
                        ) {
                            const newContractData = {
                                tenantID: selectTenanatID,
                                realEstateID: id,
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
                {selectTenantStatus ? "Onayla" : "Devam"}
            </div>
        </div>
    </div>;
};

export default injectsheet(stylesheet)(RealEstateContract);