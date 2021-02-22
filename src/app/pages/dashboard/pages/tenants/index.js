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
    TenantContract
} from "../../views";
import {
    client
} from '../../../../';
import NewTenant from '../../views/newTenant';
import TenantDetail from '../../views/tenantDetail';

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
        client.query({
            query: getAllTenants,
            context: {
                headers: {
                    "x-access-token": globalState.user && globalState.user.loginData && globalState.user.loginData.token
                }
            }
        }).then(res => {
            if (res.data.getAllTenants.response.code === 200) {
                setDatas(res.data.getAllTenants.data);
                setFilteredData(res.data.getAllTenants.data);
            }
            setGlobalState({
                modal: {
                    ...globalState.modal,
                    isActive: false
                }
            });
        }).catch(e => {
            setGlobalState({
                modal: {
                    ...globalState.modal,
                    isActive: false
                }
            });
        });
    }, []);
    useEffect(() => {
        if (searchText && searchText.length) {
            const newFilteredData = datas.filter((data) => {
                const searchTextLowerCase = searchText.toLowerCase();
                const fullName = data.fullName.toLowerCase();
                const phoneNumber = data.phoneNumber1.toLowerCase();
                const suretyFullName = data.suretyFullName.toLowerCase();
                const suretyPhoneNumber = data.suretyPhoneNumber.toLowerCase();
                const activeApartment = data.activeApartment.length !== 0 ? data.activeApartment[0].title.toLowerCase() : "";
                return fullName.indexOf(searchTextLowerCase) > -1 ||
                    phoneNumber.indexOf(searchTextLowerCase) > -1 ||
                    suretyFullName.indexOf(suretyFullName) > -1 ||
                    suretyPhoneNumber.indexOf(suretyFullName) > -1 ||
                    activeApartment.indexOf(searchTextLowerCase) > -1;
            });
            setFilteredData(newFilteredData);
        }
        else {
            setFilteredData(datas);
        }
    }, [searchText]);

    const newTenant = () => {
        setGlobalState({
            modal: {
                isActive: true,
                type: "custom",
                children: <NewTenant/>
            }
        });
    };

    const tenantDetail = () => {
        setGlobalState({
            modal: {
                isActive: true,
                type: "custom",
                children: <TenantDetail
                    data={datas}
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
            placeholder="Ara"
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
                        onClick={() => tenantDetail()}
                    >
                        <div
                            className={classes.content}
                        >
                            <div
                                className={classes.cardLogo}
                            >
                                <img
                                    src={item.profileImageName ? item.profileImageName : "/assets/images/default-user.png"}
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
                                        children: <TenantContract id={item.id}>

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