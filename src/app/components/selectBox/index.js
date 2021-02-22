import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from "./stylesheet";

const SelectBox = ({
    onChangeValue,
    classes,
    datas,
    value,
    title,
}) => {
    return <div>
        <div>{title}</div>
        <select
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
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