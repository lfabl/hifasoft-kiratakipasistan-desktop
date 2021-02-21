import React, {
    useState,
    useEffect
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../../../context';

const Profile = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [data, setData] = useState({
        "registerDate": "19/05/1997",
        "fullName": "Mahmut TUNCER",
        "userName": "mahmuttuncer"
    });

    useEffect(() => {
        setGlobalState({
            modal: {
                ...globalState.modal,
                isActive: false
            }
        });
    }, []);

    return <div
        className={classes.container}
    >
        <div>
            <img
                src=""
            />
        </div>
    </div>;
};
export default injectSheet(stylesheet)(Profile);