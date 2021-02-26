import {
    objectSpacing,
    active,
    hover
} from "../../../../theme/tokens";

const stylesheet = {
    container: {
        flexDirection: "column",
        padding: objectSpacing * 2,
        display: "flex"
    },
    search: {
        marginBottom: objectSpacing * 2
    },
    new: {
        marginBottom: objectSpacing * 3
    },
    content: {
        alignItems: "center",
        flexDirection: "row",
        display: "flex"
    },
    card: {
        marginBottom: objectSpacing * 1.5,
        padding: objectSpacing * 2,
        borderRadius: 10,
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    },
    cardLogo: {
        marginRight: objectSpacing * 1.5
    },
    cardTitle: {
        marginBottom: objectSpacing,
        fontWeight: 600,
        fontSize: 20
    },
    cardInfo: {
        marginBottom: objectSpacing / 2,
        fontWeight: 600,
        "& span": {
            fontWeight: 400
        }
    },
    cardLinkButton: {
        marginTop: objectSpacing,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        position: "aboslute",
        display: "flex",
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        },
        "& span": {
            marginLeft: objectSpacing
        }
    }
};
export default stylesheet;