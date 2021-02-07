import React, {
    useEffect
} from 'react';
import useGlobalState from '../../context';
import {
    DashboardNav
} from '../../navigation';

const Dashboard = ({
    history
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    useEffect(() => {
        if(globalState.user.loginData === undefined) {
            history.push("/dashboard/login");
        } else {
            history.push("/dashboard/home");
        }
    }, []);
    return <div
        style={{
            width: "100%", height: "100%" 
        }}
    >
        <DashboardNav/>
    </div>;
};
export default Dashboard;