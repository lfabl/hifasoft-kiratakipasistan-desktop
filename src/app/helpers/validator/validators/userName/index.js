
const userName = async (userName) => {
    const validateResult = userName.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/ig) || [];

    if (validateResult.length !== 0) {
        return true;
    }
    else {
        return false;
    }
};

export default userName;