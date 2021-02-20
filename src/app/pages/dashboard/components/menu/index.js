import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../../../context';
import {
    Icon 
} from '../../../../components';

const Menu = ({
    history,
    classes,
    data,
    logo
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;
    return <div
        className={classes.container}
        style={{
            backgroundColor: colors.layer2
        }}
    >
        <div
            className={classes.table}
        >
            <div
                className={classes.tableCell}
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
                                className={classes.itemTable}
                                key={index}
                                style={{
                                    backgroundColor: window.location.pathname === item.route ? colors.primary : "transparent"
                                }}
                            >
                                <div
                                    className={classes.itemTableCell}
                                >
                                    <div
                                        onClick={() => history.push(item.route)}
                                        className={classes.item}
                                        style={{
                                            color: colors.body
                                        }}
                                    >
                                        <Icon
                                            color={colors.body}
                                            name={item.icon}
                                            size={24}
                                            className={classes.icon}
                                        />
                                        {item.title}
                                    </div>
                                </div>
                            </div>;
                        })
                        :
                        null
                }
            </div>
        </div>
    </div>;
};
export default injectSheet(stylesheet)(Menu);