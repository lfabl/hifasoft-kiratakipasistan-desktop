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
var ipcRenderer = window.require("electron").ipcRenderer;

const DASHBOARD_MENU = [
    {
        "title": "Ana Sayfa",
        "route": "/dashboard/home",
        "icon": "home"
    },
    {
        "title": "Emlak Portföyüm",
        "route": "/dashboard/realEstates",
        "icon": "industry"
    },
    {
        "title": "Kiracı Portföyüm",
        "route": "/dashboard/tenants",
        "icon": "user-friends"
    },
    {
        "title": "Profil",
        "route": "/dashboard/profile",
        "icon": "user"
    }
];

const Dashboard = ({
    history,
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const handleGo = () => {
        if (globalState.user && !globalState.user.loginData) {
            history.push("/dashboard/login");
        } else {
            history.push("/dashboard/home");
        }
    };
    /*
    const getCacheUserData = async () => {
        const userTokenData = await ipcRenderer.sendSync("getUserData");
        if(userTokenData) {
            // token teyit, varsa app open, yoksa karrrrışma.
        }
    };
    useEffect(() => {
        getCacheUserData();
    }, []);
    */

    useEffect(() => {
        handleGo();
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
        <DashboardNav />
    </div>;
};
export default injectSheet(stylesheet)(Dashboard);