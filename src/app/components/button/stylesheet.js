import {
    objectSpacing,
    active
} from "../../theme/tokens";

export const styleMain = {
    container: {
        padding: objectSpacing * 1.5 + "px " + objectSpacing + "px",
        fontFamily: "'Exo 2', sans-serif",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "600",
        outline: "none",
        display: "flex",
        border: "none",
        fontSize: 18,
        "&:hover": {
            cursor: "pointer",
            opacity: 0.75
        },
        "&:active": {
            ...active
        }
    }
};