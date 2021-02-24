export const paymentTypes = [
    {
        label: "Peşin",
        value: "cash"
    },
    {
        label: "Havale",
        value: "transfer"
    },
    {
        label: "Kredi Kartı",
        value: "installment"
    }
];
export const paymentPeriodTypes = [
    {
        label: "Aylık",
        value: "monthly"
    },
    {
        label: "Yıllık",
        value: "yearly"
    }
];

export const rentalTypes = [
    {
        label: "Kullanımda",
        value: "continuation"
    },
    {
        label: "Boşta",
        value: "unattached"
    }
];

export const contractPeriodTypes = [
    {
        label: "Belirtilmemiş",
        value: "0"
    },
    {
        label: "1 Yıl",
        value: "1"
    },
    {
        label: "2 Yıl",
        value: "2"
    },
    {
        label: "3 Yıl",
        value: "3"
    },
    {
        label: "4 Yıl",
        value: "4"
    },
    {
        label: "5 Yıl Ve Üzeri",
        value: "5"
    }
];
export const realEstateTypes = [
    {
        label: "Dükkan",
        value: "store"
    },
    {
        label: "Daire",
        value: "apartment"
    },
    {
        label: "Diğer",
        value: "other"
    }
];

export const usageTypes = [
    {
        label: "Belirtilmemiş",
        value: "null"
    },
    {
        label: "Arsa",
        value: "land"
    },
    {
        label: "Tarla",
        value: "field"
    },
    {
        label: "Devre Mülk",
        value: "timeshare"
    },
    {
        label: "Silo",
        value: "silo"
    }
];

export const numberOfRoomTypes = [
    {
        label: "Belirtlilmemiş",
        value: "0+0"
    },
    {
        label: "1+1",
        value: "1+1"
    },
    {
        label: "2+1",
        value: "2+1"
    },
    {
        label: "3+1",
        value: "3+1"
    },
    {
        label: "4+1",
        value: "4+1"
    },
    {
        label: "5+1",
        value: "5+1"
    },
    {
        label: "6+1",
        value: "6+1"
    }
];

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

export const monthConverter = (month) => {
    if (month === 1) {
        return "Ocak";
    }
    else if (month === 2) {
        return "Şubat";
    }
    else if (month === 3) {
        return "Mart";
    }
    else if (month === 4) {
        return "Nisan";
    }
    else if (month === 5) {
        return "Mayıs";
    }
    else if (month === 6) {
        return "Haziran";
    }
    else if (month === 7) {
        return "Temmuz";
    }
    else if (month === 8) {
        return "Ağustos";
    }
    else if (month === 9) {
        return "Eylül";
    }
    else if (month === 10) {
        return "Ekim";
    }
    else if (month === 11) {
        return "Kasım";
    }
    else if (month === 12) {
        return "Aralık";
    }
};

export const selectBoxTypeConverter = async ({
    valuePropName,
    labelPropName,
    datas
}) => {
    return await new Promise((resolve, reject) => {
        const newData = [];
        if (datas.length !== 0) {
            for (let index = 0; index < datas.length; index++) {
                const item = datas[index];
                newData.push({
                    value: item[valuePropName],
                    label: item[labelPropName]
                });
                if (index + 1 === datas.length) resolve(newData);
            }
        }
        else {
            resolve(newData);
        }
    });
};


export const isoStringToDate = async (iso, type) => {
    const date = new Date(iso);
    const year = date.getUTCFullYear();
    const month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const hour = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const dates = type === "date" ? " " + year + "/" + month + "/" + day : " " + hour + ":" + minutes;
    return dates;
};

export const fileSelector = ({
    multiple,
    type
}) => {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    if (multiple) fileSelector.setAttribute('multiple', 'multiple');
    if (type) {
        fileSelector.setAttribute('accept', type);
    }
    return fileSelector;
};

export const customAlert = ({
    onPressOkey,
    message,
    title
}) => {
    const remote = window["require"]('electron').remote;
    window.confirm = function (message) {
        const buttonIdx = remote.dialog.showMessageBox(null, {
            type: 'question',
            buttons: ['OK', 'Cancel'],
            defaultId: 0,
            cancelId: 1,
            message: title,
            detail: message,
        });
        if (buttonIdx === 0) { 
            onPressOkey();
        }
        return buttonIdx === 0;
    };
    window.confirm(message);
};