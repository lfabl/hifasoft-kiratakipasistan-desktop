import React, {
    useEffect,
    useState
} from 'react';
import injectSheet from 'react-jss';
import useGlobalState from '../../context';
import {
    styleMain
} from './stylesheet';
import {
    validator
} from "../../helpers";
import {
    focusError,
    focus,
} from "../../theme/tokens";
const TextInput = ({
    wrap = "no-wrap",
    validateType,
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
    const [validateResult, setValidateResult] = useState(true);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const {
        colors
    } = globalState.theme;


    const validateDetector = async () => {
        const _validateResult = await validator([
            {
                value: value,
                validateType: validateType
            }
        ]);
        console.log(_validateResult);
        setValidateResult(_validateResult);
    };

    useEffect(() => {
        if (validateType && value !== "") {
            validateDetector();
        }
        else {
            setValidateResult(true);
        }
    }, [value]);

    const borderColor = validateResult === true ? colors.seperator : colors.accent;
    const focusColor = validateResult ? {
        ...focus
    } : {
        ...focusError
    };

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
                border: "1px solid " + borderColor,
                "&:focus": focusColor + "!important"
            }}
            {...props}
        />
    </div>;
};
export default injectSheet(styleMain)(TextInput);