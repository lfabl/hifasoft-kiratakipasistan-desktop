import React, {
    useEffect,
    Fragment
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
import {
    Modal
} from './components';

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
    return <Fragment>
        <Navigation/>
        {
            globalState.modal.isActive ?
                <Modal
                    onCancel={globalState.modal.onCancel}
                    onSubmit={globalState.modal.onSubmit}
                    type={globalState.modal.type}
                    data={globalState.modal.data}
                >
                    {globalState.modal.children}
                </Modal>
                :
                null
        }
    </Fragment>;
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