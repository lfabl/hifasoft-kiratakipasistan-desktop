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
    contractControl,
    getAvailableTenantsForContract,
    getRealEstate
} from "../../../../server/graphql";

const RealEstateContract = ({
    classes,
    id
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [loadings, setLoadings] = useState({
        haveContract: true
    });
    const [haveContractStatus, setHaveContractStatus] = useState(true);
    const [allTenants, setAllTenants] = useState([]);
    const [selectTenanatID, setSelectTenantID] = useState("");
    const [tenantTypes, setTenantTypes] = useState(0);
    const [rentalDate, setRentalDate] = useState(new Date());
    const [contractPeriod, setContractPeriod] = useState("0");
    const [rentalPrice, setRentalPrice] = useState(null);
    const [paymentType, setPaymentType] = useState("cash");
    const [paymentPeriodType, setPaymentPeriodType] = useState("monthly");
    const [paymentPeriodDate, setPaymentPeriodDate] = useState(new Date());
    const [availibleControl, setAvailibleControl] = useState(false);
    const {
        colors
    } = globalState.theme;

    useEffect(() => {
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
            setHaveContractStatus(status);
            setLoadings({
                ...loadings, 
                haveContract: false 
            });
        }).catch(e => {
            setGlobalState({
                modal: {
                    ...globalState.modal,
                    isActive: false
                }
            });
            setLoadings({
                ...loadings, haveContract: false 
            });
        });
    }, []);

    if (loadings.haveContract === true) return <div
        className={classes.loading}
    >
        <img
            src="/assets/images/preload.svg"
        />
    </div>;
    return <>
        {
            haveContractStatus ? <div
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

            </div> : <div>
                    Sözleşmeyi iptal etmek istediğinize eminmisiniz.

            </div>
        }
    </>;
};

export default injectsheet(stylesheet)(RealEstateContract);