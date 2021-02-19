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
import md5 from "js-md5";
import signin from "../../../../server/fetchs/signin";
var ipcRenderer = window.require("electron").ipcRenderer;

const Login = ({
    classes,
    history
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {
        colors
    } = globalState.theme;

    const login = async () => {
        if (userName !== "" && password !== "") {
            if (password.length < 5 || password.length > 80) {
                console.log({
                    errorMessage: "Gönderdiğiniz şifre gerekli kuralları sağlamıyor. Lütfen minimum 5 maximum 80 karakter girin!"
                })
            }
            else if (userName.length === 0) {
                console.log({
                    errorMessage: "Lütfen bir kullanıcı adı veya mail giriniz."
                })
            }
            else {
                const newMd5Password = md5(password);
                const signinResult = await signin({
                    userNameOrMail: userName,
                    password: newMd5Password
                });
                console.log(signinResult)
                if (signinResult.code === 200) {
                    await ipcRenderer.sendSync("setUserData", {
                        token: signinResult.token
                    });
                    setGlobalState({
                        user: {
                            loginData: {
                                "token": signinResult.token
                            }
                        }
                    });
                   
                }
                else {
                    console.log({
                        errorMessage: "Lütfen doğru kullanıcı adı ve şifrenizi giriniz!",
                    })
                }
            }
        }
        else {
            console.log({
                errorMessage: "Lütfen kullanıcı adı ve şifrenizi eksiksiz giriniz"
            })
        }
        setLoading(false);
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
                            onClick={() => {
                                setLoading(true);
                                login();
                            }}
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