import React, {
    useEffect
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../context';
import {
    DashboardNav
} from '../../navigation';
import Menu from './components/menu';
import {
    objectSpacing
} from '../../theme/tokens';

const DASHBOARD_MENU = [
    {
        "title": "Ana Sayfa",
        "route": "/home"
    },
    {
        "title": "Emlak Portföyüm",
        "route": "/realEstates"
    },
    {
        "title": "Kiracı Portföyüm",
        "route": "/tenants"
    },
    {
        "title": "Profil",
        "route": "/profile"
    }
];

const Dashboard = ({
    history,
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    useEffect(() => {
        if(globalState.user && !globalState.user.loginData) {
            history.push("/dashboard/login");
        } else {
            history.push("/dashboard/home");
        }
    }, [globalState.user]);
    return <div
        className={classes.container}
        style={{
            width: "100%", height: "100%"
        }}
    >
        {
            globalState.user && globalState.user.loginData !== undefined ?
                <Menu
                    data={DASHBOARD_MENU}
                    history={history}
                    logo={{
                        url: "/assets/images/icon.svg",
                        width: 75
                    }}
                    style={{
                        margin: objectSpacing + "px " + objectSpacing * 5 + "px"
                    }}
                />
                :
                null
        }
        <DashboardNav/>
    </div>;
};
export default injectSheet(stylesheet)(Dashboard);