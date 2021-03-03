import {
    monthConverter
} from "../monthConverter";

export const paymentPeriodConverter = (paymentPeriod) => {
    let returnPaymentPeriod = {
        type: "",
        date: ""
    };
    const type = paymentPeriod.type;
    const date = paymentPeriod.date;
    const newDate = new Date(date);
    returnPaymentPeriod.type = type === "monthly" ? "Ayın" : type === "yearly" ? "Yılın" : null;
    returnPaymentPeriod.date = type === "monthly" ? newDate.getDate() + ". günü" : monthConverter(newDate.getMonth() + 1) + "'ayının " + newDate.getDate() + ". günü";

    return returnPaymentPeriod;
};
