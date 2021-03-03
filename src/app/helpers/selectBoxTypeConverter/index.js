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
