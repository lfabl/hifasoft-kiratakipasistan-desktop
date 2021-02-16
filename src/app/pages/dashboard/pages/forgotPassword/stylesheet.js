import {
    objectSpacing,
    active
} from '../../../../theme/tokens';

export const styleMain = {
    container: {
        backgroundImage: "url(/assets/images/bg.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "table",
        height: "100%",
        width: "100%"
    },
    table: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "table-cell",
        height: "100%",
        width: "100%"
    },
    tableCell: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100%",
        width: "100%"
    },
    content: {
        borderRadius: objectSpacing,
        maxHeight: 700,
        minWidth: 500,
        maxWidth: 600,
        width: "80%"
    },
    header: {
        justifyContent: "flex-start",
        padding: objectSpacing * 3,
        alignItems: "center",
        display: "flex",
        width: "100%"
    },
    backButton: {
        cursor: "pointer",
        "&:active": {
            ...active
        }
    },
    inputs: {
        padding: objectSpacing * 3,
        flexDirection: "column",
        display: "flex",
        paddingTop: 0
    },
    eMail: {
        marginBottom: objectSpacing * 2
    },
    info: {
        marginBottom: objectSpacing * 4,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
        "& img": {
            marginBottom: objectSpacing
        },
        "& span": {
            fontWeight: "600",
            fontSize: 22
        }
    }
};
export default styleMain;