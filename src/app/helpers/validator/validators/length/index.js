const length = async (values, object) => {
    if (values.length > object.min && values.length < object.max) {
        return true;
    }
    else {
        return false;
    }
};

export default length;