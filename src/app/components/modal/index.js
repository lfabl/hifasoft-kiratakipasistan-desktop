import React from 'react';
import injectSheet from 'react-jss';
import {
    Icon 
} from '..';
import useGlobalState from '../../context';
import {
    objectSpacing 
} from '../../theme/tokens';
import stylesheet from './stylesheet';

const Modal = ({
    type = "dialog",
    onSubmit = {
        text: "Tamam",
        action: () => {}
    },
    onCancel,
    children,
    classes,
    data
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;

    return <div
        className={classes.container}
        style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
    >
        {
            type === "loading" ?
                <div
                    className={classes.loading}
                >
                    <img
                        src="/assets/images/preload.svg"
                    />
                </div>
                :
                type === "dialog" ?
                    <div
                        className={classes.dialog}
                        style={{
                            backgroundColor: colors.background
                        }}
                    >
                        <div
                            className={classes.dialogHeader}
                        >
                            {
                                data.icon ?
                                    <Icon
                                        name={data.icon.name}
                                        color={data.icon.color ? data.icon.color : colors.body}
                                        size={data.icon.size ? data.icon.size : 26}
                                    />
                                    :
                                    null
                            }
                            <div
                                className={classes.title}
                                style={{
                                    marginLeft: data && data.icon ? objectSpacing : null
                                }}
                            >
                                {data.title}
                            </div>
                        </div>
                        <div
                            className={classes.message}
                        >
                            {data.message}
                        </div>
                        <div
                            className={classes.buttons}
                        >
                            {
                                onCancel ?
                                    <div
                                        className={[
                                            classes.button,
                                            classes.cancel
                                        ].join(" ")}
                                        onClick={() => {
                                            setGlobalState({
                                                modal: {
                                                    ...globalState.modal,
                                                    isActive: false
                                                }
                                            });
                                            if(onCancel.action) onCancel.action();
                                        }}
                                    >
                                        {onCancel.text}
                                    </div>
                                    :
                                    null
                            }
                            <div
                                className={[
                                    classes.button,
                                    classes.submit
                                ].join(" ")}
                                onClick={() => {
                                    setGlobalState({
                                        modal: {
                                            ...globalState.modal,
                                            isActive: false
                                        }
                                    });
                                    if(onSubmit.action) onSubmit.action();
                                }}
                            >
                                {onSubmit.text}
                            </div>
                        </div>
                    </div>
                    :
                    children
        }
    </div>;
};
export default injectSheet(stylesheet)(Modal);