import {
    phoneNumber,
    tcIndenity,
    userName,
    length,
    mail,
    name,
    iban
} from "./validators";
import {
    validateTypeDetector
} from "./validatorTools";

/**
 *  @type {{ 
 *      value: String,
 *      validateType: "name" | "userName" | "mailOrUserName" | "mail" | "phoneNumber" | "tcIndenity" | "iban" | "length",
 *      validateObject: Object
 *  }} 
*/
const interfaces = {
    value: String,
    validateType: String,
    validateObject: Object
};

export const validator = async (validations = [interfaces]) => {
    for (let index = 0; index < validations.length; index++) {
        const element = validations[index];
        const validateResult = await validateDetector(element);

        /* Validate Result Controller */
        if (validateResult) {
            return validateResult;
        }
        else if (index + 1 === validations.length) {
            return false;
        }
    }
};

const validateDetector = async (element = interfaces) => {
    switch (element.validateType) {
        case "name": {
            return await name(element.value);
        }
        case "userName": {
            return await userName(element.value);
        }
        case "mail": {
            return await mail(element.value);
        }
        case "phoneNumber": {
            return await phoneNumber(element.value);
        }
        case "tcIndenity": {
            return await tcIndenity(element.value);
        }
        case "iban": {
            return await iban(element.value);
        }
        case "length": {
            return await length(element.value, element.validateObject);
        }
        case "mailOrUserName": {
            return await validateTypeDetector({
                value: element.value,
                triedValidations: ["mail", "userName"],
            });
        }
        default:
            break;
    }
};

