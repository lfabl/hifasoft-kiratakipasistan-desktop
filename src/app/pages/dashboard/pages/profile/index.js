import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';

const Profile = ({
    classes
}) => {
    const [data, setData] = useState({
        "registerDate": "19/05/1997",
        "fullName": "Mahmut TUNCER",
        "userName": "mahmuttuncer"
    });

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