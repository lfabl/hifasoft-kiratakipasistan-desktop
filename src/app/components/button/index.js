import React from 'react';
import injectSheet from 'react-jss';
import {
    styleMain
} from './stylesheet';
import useGlobalState from '../../context';

const Button = ({
    className,
    textColor,
    classes,
    onClick,
    value,
    color,
    style,
    ...props
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;
    return <button
        className={[
            classes.container,
            className
        ].join(" ")}
        onClick={onClick}
        style={{
            backgroundColor: color ? color : colors.primary,
            color: textColor ? textColor : colors.body,
            ...style
        }}
        {...props}
    >
        {value}
    </button>;
};
export default injectSheet(styleMain)(Button);