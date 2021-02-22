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
        overflow: "auto",
        maxHeight: "90%",
        borderRadius: 10,
        maxWidth: 600,
        width: "85%"
    },
    header: {
        justifyContent: "space-between",
        marginBottom: objectSpacing,
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
    },
    content: {
        display: "table",
        width: "100%"
    },
    table: {
        display: "table-cell"
    },
    tableCell: {
        flexDirection: "column",
        display: "flex"
    },
    input: {
        marginBottom: objectSpacing * 1.5
    },
    profileContainer: {
        padding: objectSpacing * 1.5,
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    },
    profile: {
        position: "relative"
    },
    updateProfilePhoto: {
        padding: objectSpacing * 1.5,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        borderRadius: 50,
        display: "flex",
        right: -15,
        top: -15,
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    }
};
export default stylesheet;