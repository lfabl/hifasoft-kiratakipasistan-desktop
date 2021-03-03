import validator from "validator";

const name = async (name) => {
    name = name.replace(" ", "");
    const validateResult = validator.isAlpha(name, ["tr-TR"]);
    if (validateResult === true) {
        return true;
    }
    else {
        return false;
    }
};

export default name;