import React, {
    useState
} from 'react';
import injectSheet from 'react-jss';
import {
    styleMain
} from './stylesheet';
import useGlobalState from '../../../../context';
import {
    TextInput,
    Button,
    Icon
} from '../../../../components';
import {
    Link
} from 'react-router-dom';

const Login = ({
    classes,
    history
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [officeName, setOfficeName] = useState("");
    const [userMail, setUserMail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {
        colors
    } = globalState.theme;
    return <div
        className={classes.container}
    >
        <div
            className={classes.table}
        >
            <div
                className={classes.tableCell}
            >
                <div
                    className={classes.content}
                    style={{
                        backgroundColor: colors.layer1
                    }}
                >
                    <div
                        className={classes.header}
                    >
                        <div
                            className={classes.backButton}
                            onClick={() => history.push("/dashboard/login")}
                        >
                            <Icon
                                color={colors.gray40}
                                name="arrow-left"
                                size={24}
                            />
                        </div>
                    </div>
                    <div
                        className={classes.inputs}
                    >
                        <div
                            className={classes.info}
                        >
                            <img
                                src="/assets/images/icon.svg"
                                width={100}
                            />
                            <span
                                style={{
                                    color: colors.body
                                }}
                            >
                                Kayıt Ol
                            </span>
                        </div>
                        <TextInput
                            value={userMail}
                            onChangeText={e => setUserMail(e)}
                            placeholder="E - Posta Adresiniz"
                            className={classes.userMail}
                        />
                        <TextInput
                            onChangeText={e => setOfficeName(e)}
                            className={classes.officeName}
                            placeholder="Ofis Adı"
                            value={officeName}
                        />
                        <TextInput
                            value={userName}
                            onChangeText={e => setUserName(e)}
                            placeholder="Kullanıcı Adı"
                            className={classes.userName}
                        />
                        <TextInput
                            onChangeText={e => setPassword(e)}
                            className={classes.password}
                            placeholder="Parolanız"
                            value={password}
                            type="password"
                        />
                        <Button
                            value="Kayıt Ol"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
export default injectSheet(styleMain)(Login);