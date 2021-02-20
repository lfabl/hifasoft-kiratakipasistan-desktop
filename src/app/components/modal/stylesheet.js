import {
    objectSpacing,
    active,
    hover
} from "../../theme/tokens";

const stylesheet = {
    container: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        display: "flex",
        bottom: 0,
        right: 0,
        left: 0,
        top: 0
    },
    loading: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: 100,
        width: 100
    },
    dialog: {
        padding: objectSpacing * 2,
        borderRadius: 10,
        maxWidth: 500,
        width: "95%"
    },
    dialogHeader: {
        marginBottom: objectSpacing * 1.5,
        flexDirection: "row",
        alignItems: "center",
        display: "flex"
    },
    title: {
        fontWeight: 600,
        fontSize: 20
    },
    content: {
        fontWeight: 400,
        fontSize: 16
    },
    buttons: {
        justifyContent: "flex-end",
        display: "flex"
    },
    button: {
        padding: objectSpacing,
        fontSize: 18,
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    },
    submit: {
        fontWeight: 600
    }
};
export default stylesheet;