import React, {
    useEffect,
    useState
} from 'react';
import injectSheet from 'react-jss';
import useGlobalState from '../../context';
import {
    styleMain
} from './stylesheet';

const TextInput = ({
    onChangeText,
    className,
    classes,
    value,
    type,
    ...props
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [_value, _setValue] = useState(value ? value : "");
    const {
        colors
    } = globalState.theme;
    useEffect(() => {
        if(onChangeText) onChangeText(_value);
    }, [_value]);
    return <input
        type={type ? type : "text"}
        value={_value}
        onChange={e => {
            _setValue(e.target.value);
        }}
        className={[
            classes.container,
            className
        ].join(" ")}
        style={{
            border: "1px solid " + colors.seperator
        }}
        {...props}
    />;
};
export default injectSheet(styleMain)(TextInput);