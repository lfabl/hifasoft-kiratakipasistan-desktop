import React, {
    useEffect
} from 'react';
import useGlobalState from '../../context';
import {
    DashboardNav
} from '../../navigation';
import Menu from './components/menu';

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
    history
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
        style={{
            width: "100%", height: "100%"
        }}
    >
        {
            globalState.user && globalState.user.loginData !== undefined ?
                <Menu
                    data={DASHBOARD_MENU}
                />
                :
                null
        }
        <DashboardNav/>
    </div>;
};
export default Dashboard;