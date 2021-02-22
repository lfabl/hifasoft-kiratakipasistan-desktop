import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from "./stylesheet";

const TypeSwitch = ({
    onChangeValue,
    unSelectColor,
    selectColor,
    classes,
    value,
    title,
    types,
}) => {
    const defaultRadiusValue = 10;
    const defaultRadiusWidthValue = 0.5;
    const defaultSelectColor = selectColor ? selectColor : "#303030";
    const defaultUnselectColor = unSelectColor ? unSelectColor : "white";
    return <div>
        <div>{title}</div>
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row"
        }}>
            {
                types.map((item, key) => {
                    return <div
                        key={key}
                        style={{
                            flexGrow: 1,
                            backgroundColor: value === item.value ? defaultSelectColor : defaultUnselectColor,
                            padding: 16,
                            alignItems: "center",
                            borderTopLeftRadius: key === 0 ? defaultRadiusValue : 0,
                            borderBottomLeftRadius: key === 0 ? defaultRadiusValue : 0,
                            borderTopRightRadius: key === types.length - 1 ? defaultRadiusValue : 0,
                            borderBottomRightRadius: key === types.length - 1 ? defaultRadiusValue : 0,
                            borderRightWidth: key === 0 || key !== types.length - 1 ? defaultRadiusWidthValue : 0,
                            borderLeftWidth: key === types.length - 1 ? defaultRadiusWidthValue : 0,
                            borderColor: defaultSelectColor
                        }}
                        onClick={() => {
                            onChangeValue(item.value);
                        }}
                    >
                        <div style={{
                            color: value === item.value ? defaultUnselectColor : defaultSelectColor
                        }}>
                            {
                                item.label
                            }
                        </div>
                    </div>;
                })
            }
        </div>
    </div>;
};
export default injectSheet(stylesheet)(TypeSwitch);