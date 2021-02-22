import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from "./stylesheet";
const DatePicker = ({
    onChangeValue,
    classes,
    value,
    title,
}) => {
    return <div>
        <div>{title}</div>
        <input type={"date"} value={value} onChange={(e) => onChangeValue(e.target.value)}></input>
    </div>;
};
export default injectSheet(stylesheet)(DatePicker);