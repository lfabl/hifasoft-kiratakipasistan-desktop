import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../../../context';

const Home = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    return <div
        className={classes.container}
    >
        Home Page
        <div
            onClick={() => {
                setGlobalState({
                    user: {
                        loginData: undefined
                    }
                });
            }}
        >
            Çıkış Yap
        </div>
    </div>;
};
export default injectSheet(stylesheet)(Home);