import React, {
    useEffect,
    useState,
    useRef
} from 'react';
import useGlobalState from '../../../../context';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import {
    customAlert
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
    const [isEdit, setIsEdit] = useState(null);
    const [editValue, setEditValue] = useState("");
    const {
        colors
    } = globalState.theme;


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
                    onAddItem({
                        itemName: `Demirbaş ${datas.length + 1}`,
                        images: []
                    });
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
                                    return <div
                                        key={pIndex}
                                        className={classes.fixtureImage}
                                    >
                                        <img
                                            height={75}
                                            src={"data:image/png;base64, " + pItem.imageBase64}
                                            width={75}
                                            style={{
                                                objectFit: "contain"
                                            }}
                                            className={classes.fixtureImage}
                                        />
                                        <div
                                            className={classes.fixtureRemoveImage}
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
                        </div>
                        <div
                            className={classes.fixtureCounter}
                            style={{
                                color: colors.hideText
                            }}
                        >
                            7 / 8
                        </div>
                    </div>;
                })
            }
        </div>
    </div>;
};


export default injectSheet(stylesheet)(FixtureCard);