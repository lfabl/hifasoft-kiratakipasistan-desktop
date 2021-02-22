import React, {
    useState,
    useEffect
} from "react";
import injectsheet from "react-jss";
import stylesheet from './stylesheet';
import {
    SelectBox
} from "../../../../components";
import useGlobalState from '../../../../context';
import {
    client
} from '../../../../index';
import {
    selectBoxTypeConverter
} from "../../../../helpers";
import {
    contractControl,
    getAvailableTenantsForContract,
    getRealEstate
} from "../../../../server/graphql";

const RealEstateContract = ({
    classes,
    id
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [loading, setLoading] = useState(true);
    const [allTenants, setAllTenants] = useState([]);
    const [selectTenanatID, setSelectTenantID] = useState("");
    const [tenantTypes, setTenantTypes] = useState(0);
    const [rentalDate, setRentalDate] = useState(new Date());
    const [contractPeriod, setContractPeriod] = useState("0");
    const [rentalPrice, setRentalPrice] = useState(null);
    const [paymentType, setPaymentType] = useState("cash");
    const [paymentPeriodType, setPaymentPeriodType] = useState("monthly");
    const [paymentPeriodDate, setPaymentPeriodDate] = useState(new Date());
    const {
        colors
    } = globalState.theme;

    const reset = () => {
        setLoading(true);
        setSelectTenantID("");
        setTenantTypes(0);
        setRentalDate(new Date());
        setContractPeriod("0");
        setRentalPrice(null);
        setPaymentType("cash");
        setPaymentPeriodType("monthly");
        setPaymentPeriodDate(new Date());
    };
    const getEstateData = () => {
        client.query({
            query: getAvailableTenantsForContract,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            }
        }).then(async (res) => {
            if (res.data.getRealEstate.response.code === 200) {
                const data = res.data.getRealEstate.data;
                setRentalPrice(data.detailRent);
                setPaymentPeriodType(data.paymentPeriod.type);
                setPaymentPeriodDate(new Date(data.paymentPeriod.date));
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
            }
        }).then(async (res) => {
            if (res.data.getAvailableTenantsForContract.response.code === 200) {
                const converterdTenants = await selectBoxTypeConverter({
                    datas: res.data.getAvailableTenantsForContract.data,
                    labelPropName: "fullName",
                    valuePropName: "id"
                });
                setAllTenants(converterdTenants);
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

        <div
            className={classes.title}
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
            Kiracı seçimi
        </div>
        <SelectBox
            datas={allTenants}
            value={selectTenanatID}
            onChangeValue={(val) => setSelectTenantID(val)}
        />

    </div>
    ;
};

export default injectsheet(stylesheet)(RealEstateContract);