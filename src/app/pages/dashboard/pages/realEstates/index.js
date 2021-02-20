import React, {
    useState
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import {
    Button,
    TextInput
} from '../../../../components';
import useGlobalState from '../../../../context';

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
            className={classes.}
        />
    </div>;
};
export default injectSheet(stylesheet)(RealEstates);