import {
    objectSpacing,
    active,
    hover
} from "../../../../theme/tokens";

const stylesheet = {
    container: {
        paddingBottom: objectSpacing * 2.5,
        paddingRight: objectSpacing * 1.5,
        paddingTop: objectSpacing * 1.5,
        paddingLeft: objectSpacing * 2,
        maxHeight: "90%",
        borderRadius: 10,
        maxWidth: 600,
        width: "85%"
    },
    header: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        display: "flex"
    },
    close: {
        padding: objectSpacing,
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    },
    title: {
        fontWeight: 700,
        fontSize: 18
    }
};
export default stylesheet;