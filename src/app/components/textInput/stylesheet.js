import {
    objectSpacing,
    focus
} from "../../theme/tokens";

export const styleMain = {
    container: {
        fontFamily: "'Exo 2', sans-serif",
        backgroundColor: "transparent",
        padding: objectSpacing * 1.5 + "px " + objectSpacing + "px",
        outline: "none",
        fontSize: 18,
        "&:hover": {
            cursor: "text"
        },
        "&:focus": {
            ...focus
        }
    }
};