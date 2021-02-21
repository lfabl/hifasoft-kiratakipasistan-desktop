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

const Tenants = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([
        {
            "userName": "Furkan Atakan BOZKURT",
            "phone": "0555 555 55 55",
            "aktifDaire": "Yok",
            "kefil": "Nahçıvan",
            "kefilPhone": "0543 333 35 53"
        }
    ]);
    const {
        colors
    } = globalState.theme;

    useEffect(() => {
        setGlobalState({
            modal: {
                ...globalState.modal,
                isActive: false
            }
        }, []);
    }, []);

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
            onClick={() => {}}
            value="Yeni Kiracı Oluştur"
            color={colors.primary}
            icon={{
                name: "user-plus",
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
                        <div
                            className={classes.content}
                        >
                            <div
                                className={classes.cardLogo}
                            >
                                <img
                                    src={item.profilePhoto ? item.profilePhoto : "/assets/images/default-user.png"}
                                    width="50px"
                                />
                            </div>
                            <div>
                                <div className={classes.cardTitle}>{item.title}</div>
                                <div className={classes.cardInfo}>Telefon Numarası: <span>{item.phone}</span></div>
                                <div className={classes.cardInfo}>Aktif Daire: <span style={{
                                    color: item.aktifDaire ? "green" : "orange"
                                }}>{item.aktifDaire}</span></div>
                                <div className={classes.cardInfo}>Kefil: <span>{item.kefil}</span></div>
                                <div className={classes.cardInfo}>Kefil Telefon: <span>{item.kefilPhone}</span></div>
                            </div>
                        </div>
                        <div
                            className={classes.cardLinkButton}
                            onClick={() => { }}
                        >
                            <Icon
                                name={item.aktifDaire ? "link" : "unlink"}
                                size={26}
                                color={item.aktifDaire ? "green" : "orange"}
                            />
                            <span>{item.aktifDaire ? "Sözleşme Başlat" : "Sözleşmeyi Sonlandır"}</span>
                        </div>
                    </div>;
                })
                :
                null
        }
    </div>;
};
export default injectSheet(stylesheet)(Tenants);