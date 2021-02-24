import {
    active,
    hover,
    objectSpacing
} from '../../../../theme/tokens';

const stylesheet = {
    table: {
        display: "table",
        height: "100%",
        width: "100%"
    },
    tableCell: {
        padding: objectSpacing * 4,
        display: "table-cell",
        height: "100%",
        width: "100%"
    },
    pastEstates: {
        padding: objectSpacing * 1.5 + "px " + objectSpacing * 2 + "px",
        marginBottom: objectSpacing * 1.5,
        borderRadius: 10,
        fontWeight: 600,
        "&:active": {
            ...active
        },
        "&:hover": {
            ...hover
        }
    },
    approachEstates: {
        padding: objectSpacing * 1.5 + "px " + objectSpacing * 2 + "px",
        marginBottom: objectSpacing * 1.5,
        borderRadius: 10,
        fontWeight: 600,
        "&:active": {
            ...active
        },
        "&:hover": {
            ...hover
        }
    },
    card: {
        marginBottom: objectSpacing * 2,
        "&:active": {
            ...active
        },
        "&:hover": {
            ...hover
        }
    },
    cardHeaderContainer: {
        padding: objectSpacing * 2,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    cardHeader: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex"
    },
    totalCount: {
        fontFamily: "'Exo 2', sans-serif",
        fontSize: 40
    },
    cardTitle: {
        borderBottomRightRadius: 10,
        padding: objectSpacing * 2,
        borderBottomLeftRadius: 10,
        fontWeight: 600,
        fontSize: 22
    },
    cardInfoContainer: {
        marginTop: objectSpacing * 1.5
    },
    cardInfoActive: {
        marginBottom: objectSpacing,
        fontWeight: 600,
        fontSize: 18
    },
    cardInfoPassive: {
        fontWeight: 600,
        fontSize: 18
    }
};
export default stylesheet;