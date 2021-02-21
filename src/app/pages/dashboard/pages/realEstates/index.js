import React, {
    useState,
    useEffect
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
    useQuery,
    useLazyQuery
} from "@apollo/react-hooks";
import {
    getAllRealEstates
} from "../../../../server/graphql";
import {
    paymentPeriodConverter
} from "../../../../helpers";
import {
    REAL_ESTATE_STATES
} from "../../../../constants";

const RealEstates = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [searchText, setSearchText] = useState("");
    const [datas, setDatas] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const {
        colors
    } = globalState.theme;

    const {
        data
    } = useQuery(getAllRealEstates);

    useEffect(() => {
        if (globalState.user && globalState.user.loginData && globalState.user.loginData.token && data && data.getAllRealEstates.response.code === 200 && JSON.stringify(data.getAllRealEstates.data) !== JSON.stringify(datas)) {
            setDatas(data.getAllRealEstates.data);
            setFilteredData(data.getAllRealEstates.data);
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
    }, [data]);

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

    useEffect(() => {
        if (searchText && searchText.length) {
            const newFilteredData = datas.filter((data) => {
                const searchTextLowerCase = searchText.toLowerCase();
                const title = data.title.toLowerCase();
                const acitveTenant = data.activeTenant.length !== 0 ? data.activeTenant[0].fullName.toLowerCase() : "";
                const ownerNameSurname = data.ownerNameSurname.toLowerCase();
                const ownerManagerPhoneNumber = data.ownerManagerPhoneNumber.toLowerCase();
                return title.indexOf(searchTextLowerCase) > -1 ||
                    acitveTenant.indexOf(searchTextLowerCase) > -1 ||
                    ownerNameSurname.indexOf(searchTextLowerCase) > -1 ||
                    ownerManagerPhoneNumber.indexOf(searchTextLowerCase) > -1;
            });
            setFilteredData(newFilteredData);
        }
        else {
            setFilteredData(datas);
        }
    }, [searchText]);

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
            onClick={() => { }}
            value="Yeni Emlak Oluştur"
            color={colors.primary}
            icon={{
                name: "plus-circle",
                size: 22
            }}
            className={classes.new}
        />
        {
            filteredData && filteredData.length ?
                filteredData.map((item, index) => {
                    const status = item.rentalType.length !== 0 && item.rentalType[0].status === "continuation" ? true : false;
                    const paymentPeriodConverted = paymentPeriodConverter(item.paymentPeriod);
                    return <div
                        key={index}
                        className={classes.card}
                        style={{
                            backgroundColor: colors.background
                        }}
                    >
                        <div>
                            <div className={classes.cardTitle}>{item.title}</div>
                            <div className={classes.cardInfo}>Durum: <span style={{
                                color: REAL_ESTATE_STATES[status ? "active" : "empty"].color
                            }}>{REAL_ESTATE_STATES[status ? "active" : "empty"].value}</span></div>
                            <div className={classes.cardInfo}>Kira Tarihi: <span>{"Her " + paymentPeriodConverted.type + " " + paymentPeriodConverted.date}</span></div>
                            <div className={classes.cardInfo}>Kira Bedeli: <span>{item.detailRent}</span></div>
                            <div className={classes.cardInfo}>Telefon Numarası: <span>{item.ownerManagerPhoneNumber}</span></div>
                            <div className={classes.cardInfo}>Mal Sahibi: <span>{item.ownerNameSurname}</span></div>
                            <div className={classes.cardInfo}>Kiracı: <span>{item.activeTenant && item.activeTenant.length !== 0 ? item.activeTenant[0].fullName : ""}</span></div>
                        </div>
                        <div
                            className={classes.cardLinkButton}
                            onClick={() => { }}
                        >
                            <Icon
                                name={!status ? "link" : "unlink"}
                                size={26}
                                color={REAL_ESTATE_STATES[status ? "active" : "empty"].color}
                            />
                            <span>{!status ? "Sözleşme Başlat" : "Sözleşmeyi Sonlandır"}</span>
                        </div>
                    </div>;
                })
                :
                null
        }
    </div>;
};
export default injectSheet(stylesheet)(RealEstates);