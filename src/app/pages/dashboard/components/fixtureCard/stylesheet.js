import {
    objectSpacing,
    active,
    hover
} from "../../../../theme/tokens";

const stylesheet = {
    table: {
        display: "table",
        width: "100%"
    },
    tableCell: {
        display: "table-cell"
    },
    fixturesContainer: {
        marginBottom: objectSpacing * 1.5
    },
    fixturesHeader: {
        justifyContent: "space-between",
        padding: objectSpacing,
        flexDirection: "row",
        alignItems: "center",
        display: "flex"
    },
    fixturesTitle: {
        fontFamily: "'Exo 2', sans-serif",
        fontWeight: 600,
        fontSize: 20
    },
    fixturesAddButton: {
        padding: objectSpacing,
        "&:hover": {
            ...hover,
        },
        "&:active": {
            ...active
        }
    },
    fixtureContainer: {
        marginBottom: objectSpacing * 1.25,
        flexDirection: "column",
        padding: objectSpacing,
        display: "flex"
    },
    fixtureHeader: {
        justifyContent: "space-between",
        marginBottom: objectSpacing,
        alignItems: "center",
        flexDirection: "row",
        display: "flex"
    },
    fixtureTitle: {
        fontFamily: "'Exo 2', sans-serif",
        fontWeight: 600,
        fontSize: 18,
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    },
    fixtureImages: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        display: "flex"
    },
    fixtureImage: {
        marginBottom: objectSpacing * 1.5,
        marginRight: objectSpacing * 1.5,
        position: "relative",
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    },
    fixtureRemoveImage: {
        padding: objectSpacing / 2,
        position: "absolute",
        right: -11,
        top: -11,
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    },
    newFixtureImage: {
        width: 75,
        height: 75,
        marginRight: objectSpacing,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    },
    fixtureEditTitle: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        display: "flex"
    },
    fixtureCounter: {
        fontFamily: "'Exo 2', sans-serif",
        justifyContent: "flex-end",
        alignItems: "center",
        display: "flex",
        fontWeight: 500,
        fontSize: 18
    }
};
export default stylesheet;