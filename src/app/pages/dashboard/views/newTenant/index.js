import React, {
    useState
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../../../context';
import {
    TextInput,
    Icon
} from '../../../../components';

const NewTenant = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;
    const [fullName, setFullName] = useState("");

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
                Yeni Kiracı Oluştur
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
        <TextInput
            onChangeText={e => setFullName(e)}
            onKeyUp={() => {}}
            value={fullName}
        />
    </div>;
};
export default injectSheet(stylesheet)(NewTenant);