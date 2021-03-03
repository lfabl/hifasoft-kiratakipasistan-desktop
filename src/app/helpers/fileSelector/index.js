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
