import validator from "validator";

const mail = async (mail) => {
    const validateResult = validator.isEmail(mail);
    if (validateResult === true) {
        return true;
    }
    else {
        return false;
    }
};

export default mail;