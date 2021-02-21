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
            overflow: "hidden",
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
        },
        "::-webkit-scrollbar": {
            height: 10,
            width: 10
        },
        "::-webkit-scrollbar-button": {
            height: 0,
            width: 0
        },
        "::-webkit-scrollbar-thumb": {
            border: "0px none #ffffff",
            background: "#ddac00",
            borderRadius: 3,
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#ffbb29"
        },
        "::-webkit-scrollbar-thumb:active": {
            background: "#c7a11a"
        },
        "::-webkit-scrollbar-track": {
            border: "0px none #ffffff",
            background: "#e6e6e6",
            borderRadius: 0
        },
        "::-webkit-scrollbar-track:hover": {
            background: "#f7f7f7"
        },
        "::-webkit-scrollbar-track:active": {
            background: "#d6d6d6"
        },
        "::-webkit-scrollbar-corner": {
            background: "transparent"
        }
    }
};