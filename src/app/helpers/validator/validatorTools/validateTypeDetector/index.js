import {
    userName,
    mail,
} from "../../validators";

/**
*  @type {{                                                                    
*      value: String,    
*      triedValidations: [ "mail" | "userName" ],
*  }} 
**/
const interfaces = {
    value: String,
    triedValidations: Array,
};

const validateTypeDetector = async (props = interfaces) => {
    const {
        value, triedValidations
    } = props;
    const types = {
        userName,
        mail,
    };

    for (let index = 0; index < triedValidations.length; index++) {
        const validationName = triedValidations[index];
        const validateFunction = types[validationName];
        const validationResult = await validateFunction(value);

        if (validationResult) {
            return true;
        }

        else if (index + 1 === triedValidations.length) {
            return true;
        }
    }
};

export default validateTypeDetector;