import React, {
    useEffect,
    useState
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import {
    TextInput,
    Button,
    Icon
} from '../../../../components';
import useGlobalState from '../../../../context';
import {
    getAllTenants
} from "../../../../server/graphql";
import {
    serverAdres
} from "../../../../server/config";
import {
    TenantContract
} from "../../views";
import {
    client
} from '../../../../';
import NewTenant from '../../views/newTenant';
import TenantDetail from '../../views/tenantDetail';
import {
    faBalanceScaleRight
} from '@fortawesome/free-solid-svg-icons';

const Tenants = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [datas, setDatas] = useState([]);
    const {
        colors
    } = globalState.theme;

    useEffect(() => {
        getTenants({
            loadingStatus: true
        });
    }, []);
    useEffect(() => {
        if (searchText && searchText.length) {
            const newFilteredData = datas.filter((data) => {
                const searchTextLowerCase = searchText.toLowerCase();
                const fullName = data.fullName.toLowerCase();
                const activeApartment = data.activeApartment.length !== 0 ? data.activeApartment[0].title.toLowerCase() : "";
                const suretyFullName = data.suretyFullName.toLowerCase();
                const suretyPhoneNumber = data.suretyPhoneNumber.toLowerCase();
                const phoneNumber1 = data.phoneNumber1.toLowerCase();
                return fullName.indexOf(searchTextLowerCase) > -1 ||
                    phoneNumber1.indexOf(searchTextLowerCase) > -1 ||
                    suretyFullName.indexOf(searchTextLowerCase) > -1 ||
                    activeApartment.indexOf(searchTextLowerCase) > -1 ||
                    suretyPhoneNumber.indexOf(searchTextLowerCase) > -1;
            });
            setFilteredData(newFilteredData);
        }
        else {
            setFilteredData(datas);
        }
    }, [searchText]);

    const getTenants = ({
        loadingStatus
    }) => {
        client.query({
            query: getAllTenants,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            },
            fetchPolicy: "network-only"
        }).then(res => {
            if (res.data.getAllTenants.response.code === 200) {
                setDatas(res.data.getAllTenants.data);
                setFilteredData(res.data.getAllTenants.data);
            }
            if (loadingStatus) {
                setGlobalState({
                    modal: {
                        ...globalState.modal,
                        isActive: false
                    }
                });
            }
        }).catch(e => {
            setGlobalState({
                modal: {
                    ...globalState.modal,
                    isActive: false
                }
            });
        });
    };

    const newTenant = () => {
        setGlobalState({
            modal: {
                isActive: true,
                type: "custom",
                children: <NewTenant
                    refetch={() => getTenants({
                        loadingStatus: false
                    })}
                />
            }
        });
    };

    const tenantDetail = (id) => {
        setGlobalState({
            modal: {
                isActive: true,
                type: "custom",
                children: <TenantDetail
                    tenantID={id}
                    refetch={() => getTenants({
                        loadingStatus: false
                    })}
                />
            }
        });
    };

    return <div
        className={classes.container}
    >
        <TextInput
            value={searchText}
            onChangeText={e => setSearchText(e)}
            title="Ara"
            className={classes.search}
        />
        <Button
            textColor={colors.body}
            onClick={() => newTenant()}
            value="Yeni Kiracı Oluştur"
            color={colors.primary}
            icon={{
                name: "user-plus",
                size: 22
            }}
            className={classes.new}
        />
        {
            filteredData && filteredData.length ?
                filteredData.map((item, index) => {
                    return <div
                        key={index}
                        className={classes.card}
                        style={{
                            backgroundColor: colors.background
                        }}
                    >
                        <div
                            className={classes.content}
                            onClick={() => tenantDetail(item.id)}
                        >
                            <div
                                className={classes.cardLogo}
                            >
                                <img
                                    src={item.profileImageName ? `${serverAdres}/profileImages/${item.profileImageName}` : "/assets/images/default-user.png"}
                                    width="100px"
                                />
                            </div>
                            <div>
                                <div className={classes.cardTitle}>{item.fullName}</div>
                                <div className={classes.cardInfo}>Telefon Numarası: <span>{item.phoneNumber1}</span></div>
                                <div className={classes.cardInfo}>Aktif Daire: <span style={{
                                    color: item.activeApartment.length !== 0 ? "green" : "orange"
                                }}>
                                    {item.activeApartment.length !== 0 ? item.activeApartment[0].title : "Atanmamış"}
                                </span></div>
                                <div className={classes.cardInfo}>Kefil: <span style={{
                                    color: item.suretyFullName.length !== 0 ? undefined : "orange"
                                }}>
                                    {item.suretyFullName.length !== 0 ? item.suretyFullName.length : "Atanmamış"}
                                </span> </div>
                                <div className={classes.cardInfo}>Kefil Telefon: <span style={{
                                    color: item.suretyPhoneNumber.length !== 0 ? undefined : "orange"
                                }}>
                                    {item.suretyPhoneNumber.length !== 0 ? item.suretyPhoneNumber.length : "Atanmamış"}
                                </span></div>
                            </div>
                        </div>
                        <div
                            className={classes.cardLinkButton}
                            onClick={() => {
                                setGlobalState({
                                    modal: {
                                        isActive: true,
                                        loading: false,
                                        type: "children",
                                        children: <TenantContract id={item.id} refetch={() => getTenants({
                                            loadingStatus: true
                                        })}>

                                        </TenantContract>
                                    }
                                });

                            }}
                        >
                            <Icon
                                name={item.activeApartment.length === 0 ? "link" : "unlink"}
                                size={26}
                                color={item.activeApartment.length === 0 ? "green" : "orange"}
                            />
                            <span>{item.activeApartment.length === 0 ? "Sözleşme Başlat" : "Sözleşmeyi Sonlandır"}</span>
                        </div>
                    </div>;
                })
                :
                null
        }
    </div>;
};
export default injectSheet(stylesheet)(Tenants);