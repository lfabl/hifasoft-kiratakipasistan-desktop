import React, {
    useEffect,
    useState,
    useRef
} from 'react';
import useGlobalState from '../../../../context';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import {
    customAlert,
    fileSelector
} from "../../../../helpers";
import {
    Icon
} from '../../../../components';
const FixtureCard = ({
    datas,
    setDatas,
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const selectFile = fileSelector({
        type: "image/*",
        multiple: true
    });
    const [addImageContainerIndex, setAddImageContainerIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [isEdit, setIsEdit] = useState(null);
    const {
        colors
    } = globalState.theme;

    selectFile.addEventListener("change", () => {
        const files = selectFile.files;
        if (files.length !== 0) {
            onAddImage(files);
        }
    });
    useEffect(() => {
        if (addImageContainerIndex !== null) {
            selectFile.click();
        }
    }, [addImageContainerIndex]);

    const onAddItem = (name) => {
        setDatas([
            ...datas,
            {
                name: name.itemName,
                images: name.images
            }
        ]);
    };
    const onEditItem = (data) => {
        const newItems = [];
        datas.map((item, index) => {
            index === data.index ?
                newItems.push({
                    name: data.itemName,
                    images: data.images
                })
                : newItems.push(item);
        });
        setDatas(newItems);
    };
    
    const onDeleteItem = (indexOnDelete) => {
        const newItems = datas.filter((item, index) => index !== indexOnDelete);
        setDatas(newItems);
    };
    const onAddImage = (images) => {
        const detectedData = datas[addImageContainerIndex];
        for (let index = 0; index < images.length; index++) {
            if (8 - detectedData.images.length > 0) {
                const image = images[index];
                detectedData.images.push({
                    newImage: image
                });
            }
            if (index + 1 === images.length) {
                const newItems = [];
                datas.map((item, index) => {
                    index === addImageContainerIndex ?
                        newItems.push({
                            name: detectedData.name,
                            images: detectedData.images
                        })
                        : newItems.push(item);
                });
                setDatas(newItems);
                setAddImageContainerIndex(null);
            }
        }
    };
    const onDeleteImage = (containerIndex, imageIndex) => {
        const detectedData = datas[containerIndex];
        const temp = detectedData.images;
        const newItems = [];

        temp.splice(imageIndex, 1);
        datas.map((item, index) => {
            index === containerIndex ?
                newItems.push({
                    name: detectedData.name,
                    images: temp
                })
                : newItems.push(item);
        });
        setDatas(newItems);
    };

    return <div
        className={classes.fixturesContainer}
    >
        <div
            className={classes.fixturesHeader}
        >
            <div
                className={classes.fixturesTitle}
            >
                Demirbaşlar
            </div>
            <div
                className={classes.fixturesAddButton}
                onClick={() => {
                    if (datas.length < 8) {
                        onAddItem({
                            itemName: `Demirbaş ${datas.length + 1}`,
                            images: []
                        });
                    }
                    else {
                        customAlert({
                            message: "Yeni demirbaş ekleme sınırına ulaştınız!",
                            buttons: ["OK"]
                        });
                    }
                }}
            >
                <Icon
                    color={colors.success}
                    name="plus-circle"
                    size={22}
                />
            </div>
        </div>
        <div
            className={classes.fixturesCards}
        >
            {
                datas.map((item, index) => {
                    console.log(item);
                    return <div
                        key={index}
                        className={classes.fixtureContainer}
                        style={{
                            border: "1px solid " + colors.seperator
                        }}
                    >
                        <div
                            className={classes.fixtureHeader}
                        >
                            {
                                isEdit === index ?
                                    <div
                                        className={classes.fixtureEditTitle}
                                    >
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                        />
                                        <button
                                            onClick={() => {
                                                if (editValue.trim().length) {
                                                    onEditItem({
                                                        index: index,
                                                        itemName: editValue,
                                                        images: JSON.parse(JSON.stringify(item.images)),
                                                    });
                                                    setIsEdit(null);
                                                }
                                                else {
                                                    customAlert({
                                                        message: "Demirbaş ismi boş olamaz!",
                                                        buttons: ["OK"]
                                                    });
                                                };
                                            }}
                                        >
                                            Kaydet
                                        </button>
                                    </div>
                                    :
                                    <div
                                        className={classes.fixtureTitle}
                                        onClick={() => {
                                            setEditValue(item.name);
                                            setIsEdit(index);
                                        }}
                                    >
                                        {item.name}
                                    </div>
                            }
                            <div
                                className={classes.fixturesAddButton}
                                onClick={() => {
                                    customAlert({
                                        message: "Demirbaş Silinsinmi?",
                                        onPressOkey: () => {
                                            onDeleteItem(index);
                                        }
                                    });
                                }}
                            >
                                <Icon
                                    color={colors.accent}
                                    name="trash"
                                    size={22}
                                />
                            </div>
                        </div>
                        <div
                            className={classes.fixtureImages}
                        >
                            {
                                item.images && item.images.map((pItem, pIndex) => {
                                    const imageSrc = pItem.newImage ? URL.createObjectURL(pItem.newImage) : "data:image/" + pItem.image.substr(pItem.image.lastIndexOf('.') + 1) + `;base64,${pItem.imageBase64}`;
                                    return <div
                                        key={pIndex}
                                        className={classes.fixtureImage}
                                    >
                                        <img
                                            height={75}
                                            src={imageSrc}
                                            width={75}
                                            style={{
                                                objectFit: "contain"
                                            }}
                                            className={classes.fixtureImage}
                                            onClick={() => {
                                                /* Resimi tam boyut açmak için */
                                            }}
                                        />
                                        <div
                                            className={classes.fixtureRemoveImage}
                                            onClick={() => {
                                                onDeleteImage(index, pIndex);
                                            }}
                                        >
                                            <Icon
                                                color={colors.accent}
                                                name="times-circle"
                                                size={22}
                                            />
                                        </div>
                                    </div>;
                                })
                            }
                            {
                                item.images.length < 8 ? <div
                                    className={classes.newFixtureImage}
                                    style={{
                                        border: "1px solid " + colors.seperator
                                    }}
                                    onClick={() => {
                                        setAddImageContainerIndex(index);
                                    }}
                                >
                                    <Icon
                                        color={colors.success}
                                        name="plus"
                                        size={22}
                                    />
                                </div> : null
                            }
                        </div>
                        <div
                            className={classes.fixtureCounter}
                            style={{
                                color: colors.hideText
                            }}
                        >
                            {
                                item.images.length
                            }/8
                        </div>
                    </div>;
                })
            }
        </div>
    </div >;
};


export default injectSheet(stylesheet)(FixtureCard);