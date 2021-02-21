import React, {
    useEffect,
    useState,
    useMemo,
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
import {
    ApolloProvider
} from '@apollo/react-hooks';
import {
    InMemoryCache
} from 'apollo-cache-inmemory';
import {
    ApolloClient
} from 'apollo-boost';
import {
    createUploadLink
} from "apollo-upload-client";
import {
    serverAdres
} from "../app/server/config";

const fetchAdress = serverAdres + "/app";
export const client = new ApolloClient({
    link: createUploadLink({
        credentials: 'same-origin',
        mode: 'same-origin',
        uri: fetchAdress
    }),
    cache: new InMemoryCache({
        addTypename: false
    })
});

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

    return <ApolloProvider client={client}>
        <Fragment>
            <Navigation />
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
        </Fragment>
    </ApolloProvider>;
};

const Root = ({
    classes
}) => {
    return <GlobalStateProvider>
        <div className={classes.container}>
            <App />
        </div>
    </GlobalStateProvider>;
};
export default injectSheet(styleMain)(Root);