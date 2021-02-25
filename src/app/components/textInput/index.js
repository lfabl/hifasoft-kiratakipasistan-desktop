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
    wrap = "no-wrap",
    onChangeText,
    placeholder,
    className,
    referance,
    classes,
    title,
    value,
    type,
    ...props
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;
   
    return <div
        className={classes.container}
        style={{
            width: "100%"
        }}
    >
        <div
            className={classes.title}
        >
            {title}
        </div>
        <input
            ref={referance}
            type={type ? type : "text"}
            value={value}
            placeholder={placeholder}
            onChange={e => {
                if (onChangeText) onChangeText(e.target.value);
            }}
            className={[
                classes.input,
                className
            ].join(" ")}
            style={{
                alignSelf: wrap === "no-wrap" ? "stretch" : wrap === "wrap" ? "baseline" : null,
                border: "1px solid " + colors.seperator
            }}
            {...props}
        />
    </div>;
};
export default injectSheet(styleMain)(TextInput);