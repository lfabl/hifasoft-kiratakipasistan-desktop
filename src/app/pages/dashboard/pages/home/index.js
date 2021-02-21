import React, {
    useState,
    useEffect
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../../../context';
import {
    Icon
} from '../../../../components';
import {
    useQuery
} from "@apollo/react-hooks";
import {
    home
} from "../../../../server/graphql";
const Home = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [approachEstates, setApproachEstates] = useState([]);
    const [pastEstates, setPastEstates] = useState([]);
    const [realEstatesStatus, setRealEstatesStatus] = useState({
        active: 0,
        passive: 0
    });
    const [totalTenantCount, setTotalTenantCount] = useState(0);
    const [activeTenants, setActiveTenants] = useState(0);
    const {
        colors
    } = globalState.theme;
    useQuery(home, {
        fetchPolicy: "cache-and-network",
        onCompleted: data => {
            if (data && data.home) {
                const newData = data.home;
                setApproachEstates(newData.approaching);
                setPastEstates(newData.pastEstateData);
                setRealEstatesStatus({
                    active: newData.totalActiveEstateCount,
                    passive: newData.totalPassiveEstateCount,
                });
                setTotalTenantCount(newData.totalTenantCount);
                setActiveTenants(newData.totalTenantCount);
                setGlobalState({
                    modal: {
                        isActive: false,
                        loading: false,
                        dialog: false,
                        data: undefined,
                        type: "loading"
                    }
                });
            }
        }
    });

    useEffect(() => {
        if (globalState.user && globalState.user.loginData && globalState.user.loginData.token) {
            setGlobalState({
                modal: {
                    isActive: true,
                    loading: true,
                    dialog: false,
                    data: undefined,
                    type: "loading"
                }
            });
        }
    }, []);

    return <div
        className={classes.table}
        style={{
            backgroundColor: colors.layer1
        }}
    >
        <div
            className={classes.tableCell}
        >
            {
                pastEstates && pastEstates.length ?
                    <div
                        className={classes.pastEstates}
                        style={{
                            backgroundColor: colors.accent,
                            color: colors.contrastBody
                        }}
                    >
                        Yenilenmesi <b>geciken {pastEstates.length}</b> adet emlak sözleşmeniz var.
                    </div>
                    :
                    null
            }
            {
                approachEstates && approachEstates.length ?
                    <div
                        className={classes.approachEstates}
                        style={{
                            backgroundColor: colors.success,
                            color: colors.contrastBody
                        }}
                    >
                        Yenilenmesi <b>yaklaşan {approachEstates.length}</b> adet emlak sözleşmeniz var.
                    </div>
                    :
                    null
            }
            <div
                className={classes.card}
            >
                <div
                    className={classes.cardHeaderContainer}
                    style={{
                        backgroundImage: "url('/assets/images/homeBG.png')",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}
                >
                    <div
                        className={classes.cardHeader}
                    >
                        <Icon
                            name="industry"
                            size={64}
                        />
                        <div className={classes.totalCount} style={{
                            color: colors.contrastBody
                        }}>{totalTenantCount}</div>
                    </div>
                    <div
                        className={classes.cardInfoContainer}
                    >
                        <div
                            className={classes.cardInfoActive}
                            style={{
                                color: colors.contrastBody
                            }}
                        >Aktif: <span style={{
                            color: colors.success
                        }}>{realEstatesStatus.active}</span></div>
                        <div
                            className={classes.cardInfoPassive}
                            style={{
                                color: colors.contrastBody
                            }}
                        >Pasif: <span style={{
                            color: colors.accent
                        }}>{realEstatesStatus.passive}</span></div>
                    </div>
                </div>
                <div className={classes.cardTitle} style={{
                    backgroundColor: colors.background
                }}>Dairelerim</div>
            </div>
            <div
                className={classes.card}
            >
                <div
                    className={classes.cardHeaderContainer}
                    style={{
                        backgroundImage: "url('/assets/images/homeBG.png')",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}
                >
                    <div
                        className={classes.cardHeader}
                    >
                        <Icon
                            name="user-friends"
                            size={64}
                        />
                        <div className={classes.totalCount} style={{
                            color: colors.contrastBody
                        }}>{activeTenants}</div>
                    </div>
                </div>
                <div className={classes.cardTitle} style={{
                    backgroundColor: colors.background
                }}>Kiracılarım - <span style={{
                    color: colors.success
                }}>Aktif</span></div>
            </div>
        </div>
    </div>;
};
export default injectSheet(stylesheet)(Home);