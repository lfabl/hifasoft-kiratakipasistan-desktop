import validator from "validator";
const iban = async (iban) => {
    const ibanControl = validator.isIBAN(iban, ["tr-TR"]);
    if (ibanControl === true) {
        return true;
    }
    else {
        return false;
    }
};

export default iban;