import React, {
    useEffect
} from 'react';
import injectSheet from 'react-jss';
import {
    styleMain
} from './stylesheet';
import Navigation from './navigation';
import useGlobalState, {
    GlobalStateProvider
} from './context';
import GenerateColors from './theme/colors';

const App = () => {
    const [globalState, setGlobalState] = useGlobalState();
    useEffect(() => {
        setGlobalState({
            theme: {
                ...globalState.theme,
                colors: GenerateColors(globalState.theme.value)
            }
        });
    }, []);
    return <Navigation/>;
};

const Root = ({
    classes
}) => {
    return <GlobalStateProvider>
        <div className={classes.container}>
            <App/>
        </div>
    </GlobalStateProvider>;
};
export default injectSheet(styleMain)(Root);