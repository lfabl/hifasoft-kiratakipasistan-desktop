import {
    objectSpacing
} from '../../theme/tokens';

const stylesheet = {
    content: {
        padding: objectSpacing * 1.5 + "px " + objectSpacing + "px",
        fontFamily: "'Exo 2', sans-serif",
        fontWeight: 600,
        width: "100%",
        fontSize: 16,
        "& option": {
            paddingBottom: objectSpacing,
            paddingTop: objectSpacing,
            width: "100%"
        }
    },
    title: {
        marginBottom: objectSpacing / 2,
        fontWeight: 700,
        fontSize: 16
    }
};
export default stylesheet;