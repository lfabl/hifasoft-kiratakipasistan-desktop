const palettes = {
    "light": require('./plattes/light.json'),
    "dark": require('./plattes/dark.json')
};

const GenerateColors = (theme) => {
    let result = palettes[theme];
    result.body = palettes[theme].gray0;
    result.layer2 = palettes[theme].gray90;
    result.seperator = palettes[theme].gray80;
    result.background = palettes[theme].gray100;
    result.contrastBody = palettes[theme].gray100;
    return result;
};
export default GenerateColors;