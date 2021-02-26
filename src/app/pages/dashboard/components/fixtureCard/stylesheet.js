import {
    objectSpacing,
    hover,
    active
} from "../../../../theme/tokens";

const stylesheet = {
    fixturesContainer: {
        marginBottom: objectSpacing * 1.5,
    },
    fixturesHeader: {
        padding: objectSpacing,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
    },
    fixturesTitle: {
        fontFamily: "'Exo 2', sans-serif",
        fontWeight: 600,
        fontSize: 20,
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
        display: "flex"
    },
    fixtureImage: {
        marginRight: objectSpacing / 2
    },
    fixtureImage: {
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