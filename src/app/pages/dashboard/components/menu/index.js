import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../../../context';

const Menu = ({
    history,
    classes,
    data,
    logo
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    return <div
        className={classes.container}
    >
        {
            logo ?
                <img
                    src={logo.url}
                    width={logo.width}
                    className={classes.logo}
                />
                :
                null
        }
        {
            data ?
                data.map((item, index) => {
                    return <div
                        onClick={() => history.push(item.route)}
                    >
                        {item.title}
                    </div>;
                })
                :
                null
        }
    </div>;
};
export default injectSheet(stylesheet)(Menu);