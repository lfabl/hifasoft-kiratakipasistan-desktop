import React from 'react';
import injectSheet from 'react-jss';
import {
    styleMain
} from './stylesheet';
import useGlobalState from '../../context';
import Icon from '../icon';
import {
    icon 
} from '@fortawesome/fontawesome-svg-core';
import {
    objectSpacing 
} from '../../theme/tokens';

const Button = ({
    className,
    textColor,
    classes,
    onClick,
    value,
    color,
    style,
    icon,
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
        {
            icon ?
                <Icon
                    color={icon.color ? icon.color : textColor ? textColor : colors.body}
                    name={icon.name}
                    size={icon.size ? icon.size : 18}
                    style={{
                        marginRight: value ? objectSpacing * 1.5 : null
                    }}
                />
                :
                null
        }
        {value}
    </button>;
};
export default injectSheet(styleMain)(Button);