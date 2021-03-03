
export const customAlert = ({
    onPressOkey,
    message,
    title,
    buttons
}) => {
    const remote = window["require"]('electron').remote;
    window.confirm = function (message) {
        const buttonIdx = remote.dialog.showMessageBox(null, {
            type: 'question',
            buttons: buttons ? buttons : ['OK', 'Cancel'],
            defaultId: 0,
            cancelId: 1,
            message: title,
            detail: message,
        });
        if (buttonIdx === 0) {
            if (onPressOkey) {
                onPressOkey();
            }
        }
        return buttonIdx === 0;
    };
    window.confirm(message);
};