import React, {
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
    const [search, setSearch] = useState();
    const [data, setData] = useState([
        {
            "title": "Mahalle Güzeli",
            "state": "empty",
            "date": "rrule",
            "amount": 349,
            "phone": "05555555555",
            "malsahibisi": "Dayı Dayı",
            "kiraci": "Gron"
        },
        {
            "title": "Tatlı Apt. No: 5",
            "state": "active",
            "date": "rrule",
            "amount": 1050,
            "phone": "05554453543",
            "malsahibisi": "Görmük",
            "kiraci": "Belirtilmemiş"
        }
    ]);
    const {
        colors
    } = globalState.theme;

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
            onClick={() => {}}
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
                                color: STATES[item.state].color 
                            }}>{STATES[item.state].value}</span></div>
                            <div className={classes.cardInfo}>Kira Tarihi: <span>{item.date}</span></div>
                            <div className={classes.cardInfo}>Kira Bedeli: <span>{item.amount}</span></div>
                            <div className={classes.cardInfo}>Telefon Numarası: <span>{item.phone}</span></div>
                            <div className={classes.cardInfo}>Mal Sahibi: <span>{item.malsahibisi}</span></div>
                            <div className={classes.cardInfo}>Kiracı: <span>{item.kiraci}</span></div>
                        </div>
                        <div
                            className={classes.cardLinkButton}
                            onClick={() => {}}
                        >
                            <Icon
                                name={item.state === "empty" ? "link" : "unlink"}
                                size={26}
                                color={STATES[item.state].color}
                            />
                            <span>{item.state === "empty" ? "Sözleşme Başlat" : "Sözleşmeyi Sonlandır"}</span>
                        </div>
                    </div>;
                })
                :
                null
        }
    </div>;
};
export default injectSheet(stylesheet)(RealEstates);