import {
    objectSpacing,
    focusError,
    focus,
} from "../../theme/tokens";

export const styleMain = {
    container: {
        flexDirection: "column",
        display: "flex",
        width: "100%"
    },
    title: {
        fontFamily: "'Exo 2', sans-serif",
        marginBottom: objectSpacing / 2,
        fontWeight: 600,
        fontSize: 16
    },
    input: {
        padding: objectSpacing * 1.5 + "px " + objectSpacing + "px",
        fontFamily: "'Exo 2', sans-serif",
        backgroundColor: "transparent",
        outline: "none",
        fontSize: 18,
        "&:hover": {
            cursor: "text"
        },
    },
    inputSuccess: {
        "&:focus": {
            ...focus
        }
    },
    inputError: {
        "&:focus": {
            ...focusError
        }
    }
};