import React from 'react';
import injectSheet from 'react-jss';
import useGlobalState from '../../context';
import stylesheet from "./stylesheet";

const DatePicker = ({
    wrap = "no-wrap",
    onChangeValue,
    className,
    classes,
    value,
    title,
    ...props
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;

    return <div
        className={[
            classes.container,
            className
        ].join(" ")}
        {...props}
    >
        <div
            className={classes.title}
        >
            {title}
        </div>
        <input
            type={"date"}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            className={classes.input}
            style={{
                alignSelf: wrap === "no-wrap" ? "stretch" : wrap === "wrap" ? "baseline" : null,
                border: "1px solid " + colors.seperator
            }}
        />
    </div>;
};
export default injectSheet(stylesheet)(DatePicker);