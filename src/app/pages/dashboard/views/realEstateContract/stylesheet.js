import {
    objectSpacing,
} from "../../../../theme/tokens";
 
const stylesheet = {
    container: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
        padding: objectSpacing * 2,
        borderRadius: 10,
        maxWidth: 500,
        width: "95%"
    },
    loading: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: 100,
        width: 100
    },
};
export default stylesheet;