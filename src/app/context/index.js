import React, {
    createContext,
    useContext,
    useReducer
} from 'react';
import DEFAULT_GLOBAL_STATE from '../constants';

const GlobalStateContext = createContext(DEFAULT_GLOBAL_STATE);
const GlobalStateDispatchContext = createContext(undefined);

export const GlobalStateProvider = ({
    children 
}) => {
    const [state, dispatch] = useReducer(
        (oldValue, newValue) => ({
            ...oldValue, ...newValue 
        }),
        DEFAULT_GLOBAL_STATE
    );
    return <GlobalStateContext.Provider
        value={state}
    >
        <GlobalStateDispatchContext.Provider
            value={dispatch}
        >
            {children}
        </GlobalStateDispatchContext.Provider>
    </GlobalStateContext.Provider>;
};

const useGlobalState = () => [
    useContext(GlobalStateContext),
    useContext(GlobalStateDispatchContext)
];
export default useGlobalState;
