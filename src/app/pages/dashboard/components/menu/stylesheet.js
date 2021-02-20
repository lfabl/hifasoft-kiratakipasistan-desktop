import {
    objectSpacing
} from "../../../../theme/tokens";

const stylesheet = {
    container: {
        display: "table",
        height: "100%",
        width: "5em"
    },
    table: {
        display: "table-cell",
        height: "100%"
    },
    tableCell: {
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
        height: "100%"
    },
    logo: {
        margin: objectSpacing * 3 + "px " + objectSpacing * 2 + "px"
    },
    itemTable: {
        display: "table",
        width: "100%",
        "&:hover": {
            cursor: "pointer",
            opacity: 0.5
        }
    },
    itemTableCell: {
        padding: objectSpacing * 3 + "px " + objectSpacing * 2 + "px",
        display: "table-cell",
        width: "100%"
    },
    item: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontWeight: 600,
        display: "flex",
        width: "100%",
        fontSize: 18,
    },
    icon: {
        marginBottom: objectSpacing / 2
    }
};
export default stylesheet;