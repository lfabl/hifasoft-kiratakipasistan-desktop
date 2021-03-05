import React, {
    useState,
    useRef,
    useEffect
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
    const [hidePassword, setHidePassword] = useState(false);
    const [globalState, setGlobalState] = useGlobalState();
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {
        colors
    } = globalState.theme;

    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const login = async () => {
        if (userName !== "" && password !== "") {
            if (password.length < 5 || password.length > 80) {
                setGlobalState({
                    modal: {
                        isActive: true,
                        loading: false,
                        dialog: true,
                        data: {
                            title: "Eksik Veri!",
                            message: "Gönderdiğiniz şifre gerekli kuralları sağlamıyor. Lütfen minimum 5 maksimum 80 karakter girin."
                        }
                    }
                });
            }
            else if (userName.length === 0) {
                setGlobalState({
                    modal: {
                        isActive: true,
                        loading: false,
                        dialog: true,
                        data: {
                            title: "Eksik Veri!",
                            message: "Lütfen bir kullanıcı adı veya mail giriniz."
                        }
                    }
                });
            }
            else {
                const newMd5Password = md5(password);
                const signinResult = await signin({
                    userNameOrMail: userName,
                    password: newMd5Password
                });
                
                if (signinResult.code === 200) {
                    /*
                    await ipcRenderer.sendSync("setUserData", {
                        token: signinResult.token
                    });
                    */
                    setGlobalState({
                        user: {
                            loginData: {
                                "token": signinResult.token
                            }
                        }
                    });
                }
                else {
                    setGlobalState({
                        modal: {
                            isActive: true,
                            loading: false,
                            dialog: true,
                            data: {
                                title: "Eksik Veri!",
                                message: "Lütfen doğru kullanıcı adı ve şifrenizi giriniz."
                            }
                        }
                    });
                }
            }
        }
        else {
            setGlobalState({
                modal: {
                    isActive: true,
                    loading: false,
                    dialog: true,
                    data: {
                        title: "Eksik Veri!",
                        message: "Lütfen kullanıcı adı ve şifrenizi eksiksiz giriniz."
                    }
                }
            });
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
                            onKeyUp={e => e.keyCode === 13 ? passwordRef.current.focus() : null}
                            title="Kullanıcı Adınız veya E-Posta"
                            className={classes.userName}
                            referance={emailRef}
                            validateType={"mailOrUserName"}
                        />
                        <div
                            className={classes.passwordContainer}
                        >
                            <TextInput
                                onChangeText={e => setPassword(e)}
                                className={classes.password}
                                referance={passwordRef}
                                onKeyUp={e => {
                                    if(e.keyCode === 13) {
                                        setLoading(true);
                                        login(); 
                                    }
                                }}
                                title="Parolanız"
                                value={password}
                                type={hidePassword ? "text" : "password"}
                            />
                            <div
                                className={classes.eyeContainer}
                                onClick={() => setHidePassword(!hidePassword)}
                            >
                                <Icon
                                    color={colors.body}
                                    name={hidePassword ? "eye" : "eye-slash"}
                                    size={32}
                                />
                            </div>
                        </div>
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