import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../../../../../context';
import {
    Icon
} from '../../../../../../components';
import moment from 'moment';

const AlertDetail = ({
    history,
    classes,
    title,
    data
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;

    return <div
        className={classes.container}
        style={{
            backgroundColor: colors.background
        }}
    >
        <div
            className={classes.header}
        >
            <div
                className={classes.title}
            >
                {title}
            </div>
            <div
                className={classes.close}
                onClick={() => setGlobalState({
                    modal: {
                        ...globalState.modal,
                        isActive: false
                    }
                })}
            >
                <Icon
                    color={colors.body}
                    name="times"
                    size={24}
                />
            </div>
        </div>
        <div
            className={classes.content}
        >
            <div
                className={classes.table}
            >
                <div
                    className={classes.tableCell}
                >
                    {
                        data.map((item, index) => {
                            const contractFinishDate = new Date(moment(new Date(item.contract.rentalDate)).add(parseInt(item.contract.contractPeriod), "years"));
                            const diff = contractFinishDate - new Date();
                            return <div
                                key={index}
                                className={classes.item}
                                style={{
                                    borderColor: colors.seperator
                                }}
                                onClick={() => history.push("/dashboard/realEstates/" + item.id)}
                            >
                                <div>
                                    {item.title}
                                </div>
                                <div>
                                    {Math.abs(Math.floor((diff * -1) / (1000 * 3600 * 24)))} gün
                                </div>
                            </div>;
                        })
                    }
                </div>
            </div>
        </div>
    </div>;
};
export default injectSheet(stylesheet)(AlertDetail);