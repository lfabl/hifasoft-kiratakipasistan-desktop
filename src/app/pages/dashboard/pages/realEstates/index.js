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
    useQuery
} from "@apollo/react-hooks";
import {
    getAllRealEstates
} from "../../../../server/graphql";
import {
    paymentPeriodConverter
} from "../../../../helpers";
const STATES = {
    "empty": {
        "color": "orange",
        "value": "Boş"
    },
    "active": {
        "value": "Kullanımda",
        "color": "green"
    }
};

const RealEstates = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const {
        colors
    } = globalState.theme;
    useQuery(getAllRealEstates, {
        fetchPolicy: "cache-and-network",
        onCompleted: data => {
            if (data && data.getAllRealEstates.response.code === 200) {
                setData(data.getAllRealEstates.data)
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
        className={classes.container}
    >
        <TextInput
            value={search}
            onChangeText={e => setSearch(e)}
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
            data && data.length ?
                data.map((item, index) => {
                    const status = item.rentalType.length !== 0 && item.rentalType[0].status === "continuation" ? true : false
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
                                color: STATES[status ? "active" : "empty"].color
                            }}>{STATES[status ? "active" : "empty"].value}</span></div>
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
                                color={STATES[status ? "active" : "empty"].color}
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