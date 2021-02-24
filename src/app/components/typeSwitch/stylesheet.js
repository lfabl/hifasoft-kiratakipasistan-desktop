import {
    active,
    hover
} from '../../theme/tokens';

const stylesheet = {
    tab: {
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    }
};
export default stylesheet;