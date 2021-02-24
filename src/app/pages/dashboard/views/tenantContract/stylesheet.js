import {
    objectSpacing,
    active,
    hover
} from "../../../../theme/tokens";
 
const stylesheet = {
    container: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
        padding: objectSpacing * 2,
        borderRadius: 10,
        maxWidth: 500,
        width: "95%"
    },
    loading: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: 100,
        width: 100
    },
    title: {
        fontWeight: 600,
        fontSize: 20
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
    },
    item: {
        marginBottom: objectSpacing
    }
};
export default stylesheet;