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
<<<<<<< HEAD
var ipcRenderer = window.require("electron").ipcRenderer;
=======
import {
    objectSpacing
} from '../../theme/tokens';
>>>>>>> 6b40ec8ac42e098f1e662c14a8b6c892033b15a7

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
    const handleGo = async () => {
        const userTokenData = await ipcRenderer.sendSync("getUserData");
        console.log("useToken", userTokenData)
        if (globalState.user && !globalState.user.loginData) {
            history.push("/dashboard/login");
        } else {
            history.push("/dashboard/home");
        }
    }
    useEffect(() => {
        handleGo()
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