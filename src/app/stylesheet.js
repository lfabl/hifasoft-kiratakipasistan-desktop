import {
    active,
    hover
} from './theme/tokens';

export const styleMain = {
    container: {
        width: "100%",
        height: "100%"
    },
    "@global": {
        "html, body, #root": {
            fontFamily: "'Exo 2', sans-serif",
            backgroundColor: "#F3F3F3",
            userSelect: "none",
            outline: "none",
            height: "100%",
            width: "100%"
        },
        "*": {
            transition: "all 0.5s",
            padding: 0,
            margin: 0
        },
        "a": {
            cursor: "pointer",
            color: "#444444"
        },
        "a div:hover": {
            ...hover
        },
        "a div:active": {
            transform: "translateY(2px)",
            ...active
        },
        "::placeholder": {
            opacity: 0.4
        }
    }
};