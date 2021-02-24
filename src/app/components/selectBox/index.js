import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from "./stylesheet";
import useGlobalState from '../../context';

const SelectBox = ({
    onChangeValue,
    classes,
    datas,
    value,
    title,
    ...props
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;

    return <div
        {...props}
    >
        <div
            className={classes.title}
        >
            {title}
        </div>
        <select
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            className={classes.content}
            style={{
                border: "1px solid " + colors.seperator
            }}
        >
            {
                datas.map((item, index) => {
                    return <option value={item.value} key={index}>{item.label}</option>;
                })
            }
        </select>
    </div>;
};
export default injectSheet(stylesheet)(SelectBox);