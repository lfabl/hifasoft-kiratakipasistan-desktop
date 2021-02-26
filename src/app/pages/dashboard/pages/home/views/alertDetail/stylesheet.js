import {
    objectSpacing,
    active,
    hover
} from "../../../../../../theme/tokens";

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
        overflowY: "auto",
        display: "flex"
    },
    item: {
        marginBottom: objectSpacing * 1.5,
        justifyContent: "space-between",
        padding: objectSpacing,
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: 10,
        display: "flex",
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    }
};
export default stylesheet;