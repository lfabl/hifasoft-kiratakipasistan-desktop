import validator from "validator";

const phoneNumber = async (phoneNumber) => {
    const validateResult = validator.isMobilePhone(phoneNumber, ["tr-TR"]);
    if (validateResult === true) {
        return true;
    }
    else {
        return false;
    }
};

export default phoneNumber;