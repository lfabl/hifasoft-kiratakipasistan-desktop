import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import ForgotPassword from '../pages/dashboard/pages/forgotPassword';
import Signup from '../pages/dashboard/pages/signup';
import Login from '../pages/dashboard/pages/login';
import Home from '../pages/dashboard/pages/home';
import Dashboard from '../pages/dashboard';
import Welcome from '../pages/welcome';

export const DashboardNav = () => (
    <main style={{
        width: "100%", height: "100%" 
    }}>
        <Switch>
            <Route path="/dashboard/home" component={Home}/>
            <Route path="/dashboard/login" component={Login}/>
            <Route path="/dashboard/signup" component={Signup}/>
            <Route path="/dashboard/forgotpassword" component={ForgotPassword}/>
        </Switch>
    </main>
);

const Navigation = () => (
    <main style={{
        width: "100%", height: "100%" 
    }}>
        <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/dashboard" component={Dashboard}/>
        </Switch>
    </main>
);
export default Navigation;