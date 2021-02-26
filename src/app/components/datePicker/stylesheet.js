import {
    objectSpacing
} from '../../theme/tokens';

const stylesheet = {
    container: {
        flexDirection: "column",
        display: "flex",
        width: "100%"
    },
    input: {
        padding: objectSpacing * 1.5 + "px " + objectSpacing + "px",
        fontFamily: "'Exo 2', sans-serif",
        fontWeight: 600
    },
    title: {
        fontFamily: "'Exo 2', sans-serif",
        marginBottom: objectSpacing / 2,
        fontWeight: 600,
        fontSize: 16
    }
};
export default stylesheet;