
export const fixtureDataConverter = async (datas) => {
    return await new Promise(async (resolve, reject) => {
        if (datas.length !== 0) {
            const newFixtureDatas = [];
            for (let index = 0; index < datas.length; index++) {
                const element = datas[index];

                if (element.images.length !== 0) {
                    const newFixtureDatasImages = [];
                    for (let index = 0; index < element.images.length; index++) {
                        const fixTureDatas = element.images[index];
                        const newDatas = {
                        };
                        
                        newDatas.image = fixTureDatas.image;
                        if (typeof fixTureDatas['newImage'] !== 'undefined') {
                            newDatas.newImage = fixTureDatas.newImage;
                        }

                        newFixtureDatasImages.push(newDatas);
                        if (element.images.length - 1 === index) {
                            newFixtureDatas.push({
                                name: element.name,
                                images: newFixtureDatasImages
                            });
                        }
                    }
                }
                
                else {
                    newFixtureDatas.push({
                        name: element.name,
                        images: []
                    });
                }
                if (datas.length - 1 === index) {
                    resolve(newFixtureDatas);
                }
            }
        }
        else {
            resolve([]);
        }
    });
};