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
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {
        colors
    } = globalState.theme;
    const login = () => {
        history.push("/dashboard/home");
    };
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
                            onClick={() => history.push("/")}
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
                                Giriş Yap
                            </span>
                        </div>
                        <TextInput
                            value={userName}
                            onChangeText={e => setUserName(e)}
                            placeholder="Kullanıcı Adınız"
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
                            value="Giriş Yap"
                            onClick={() => login()}
                        />
                        <Link
                            to="/dashboard/forgotPassword"
                            className={classes.forgotPasssword}
                        >
                            <div>
                                Parolamı Unuttum
                            </div>
                        </Link>
                        <div
                            className={classes.signup}
                        >
                            Bir hesabınız yok mu ?
                            <Link
                                to="/dashboard/signup"
                            >
                                <span>Kayıt Ol</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
export default injectSheet(styleMain)(Login);