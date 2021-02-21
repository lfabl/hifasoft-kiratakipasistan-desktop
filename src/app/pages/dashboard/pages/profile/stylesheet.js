import {
    objectSpacing
} from '../../../../theme/tokens';

const stylesheet = {
    loading: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    },
    container: {
        padding: objectSpacing * 10
    },
    profilData: {
        marginBottom: objectSpacing * 3
    },
    photo: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        objectFit: "cover"
    },
    info: {
        padding: objectSpacing * 2 + "px " + objectSpacing * 1.5 + "px",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        display: "flex"
    },
    infoTitle: {
        marginBottom: objectSpacing / 2,
        fontWeight: 600,
        fontSize: 22
    },
    infoContent: {
        fontWeight: 400,
        fontSize: 18
    },
    date: {
        padding: objectSpacing * 2 + "px " + objectSpacing * 1.5 + "px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        fontWeight: 600,
        fontSize: 18,
        "& span": {
            marginLeft: objectSpacing / 2,
            fontWeight: 400
        }
    },
    passwordContainer: {
        padding: objectSpacing * 4,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        display: "flex"
    },
    input: {
        marginBottom: objectSpacing * 1.5,
        alignSelf: "stretch"
    },
    submit: {
        marginTop: objectSpacing * 1.5
    }
};
export default stylesheet;