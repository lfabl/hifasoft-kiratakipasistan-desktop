import React, {
    useState,
    useRef
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
import signup from "../../../../server/fetchs/signup";
var ipcRenderer = window.require("electron").ipcRenderer;

const Login = ({
    classes,
    history
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [loading, setLoading] = useState(false);
    const [officeName, setOfficeName] = useState("");
    const [userMail, setUserMail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {
        colors
    } = globalState.theme;

    const officeRef = useRef();
    const userNameRef = useRef();
    const passwordRef = useRef();

    const signupUser = async () => {
        if (userName === "" || password === "" || officeName === "" || userMail === "") {
            setGlobalState({
                modal: {
                    isActive: true,
                    loading: false,
                    dialog: true,
                    data: {
                        title: "Hata!",
                        message: "Lütfen istenilen her bilgiyi doldurduğunuzdan emin olunuz."
                    }
                }
            });
        }
        else if (password.length < 5 || password.length > 80) {
            setGlobalState({
                modal: {
                    isActive: true,
                    loading: false,
                    dialog: true,
                    data: {
                        title: "Hata!",
                        message: "Gönderdiğiniz şifre gerekli kuralları sağlamıyor. Lütfen minimum 5 maksimum 80 karakter giriniz."
                    }
                }
            });
        }
        else {
            const md5Password = md5(password);
            const signupResult = await signup({
                userName: userName,
                mail: userMail,
                password: md5Password,
                fullName: officeName
            });
            if (signupResult.code === 200) {
                /*
                await ipcRenderer.sendSync("setUserData", {
                    token: signupResult.token
                });
                */
                
                setGlobalState({
                    user: {
                        loginData: {
                            "token": signupResult.token
                        }
                    }
                });
                
            }
            else {
                if (signupResult.message.indexOf("userName") !== -1) {
                    setGlobalState({
                        modal: {
                            isActive: true,
                            loading: false,
                            dialog: true,
                            data: {
                                title: "Hata!",
                                message: "Gönderdiğiniz kullanıcı adı gerekli kuralları sağlamıyor. Lütfen minimum 3 maksimum 35 karakter giriniz."
                            }
                        }
                    });
                }
                else if (signupResult.message.indexOf("mail") !== -1) {
                    setGlobalState({
                        modal: {
                            isActive: true,
                            loading: false,
                            dialog: true,
                            data: {
                                title: "Hata!",
                                message: "Gönderdiğiniz mail gerekli kuralları sağlamıyor. Lütfen minimum 5 maksimum 80 karakter giriniz."
                            }
                        }
                    });
                }
                else if (signupResult.message.indexOf("fullName") !== -1) {
                    setGlobalState({
                        modal: {
                            isActive: true,
                            loading: false,
                            dialog: true,
                            data: {
                                title: "Hata!",
                                message: "Gönderdiğiniz ofis adı gerekli kuralları sağlamıyor. Lütfen minimum 4 maksimum 45 karakter giriniz."
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
                                title: "Hata!",
                                message: signupResult.message
                            }
                        }
                    });
                }
            }
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
                            title="E - Posta Adresiniz"
                            onKeyUp={e => e.keyCode === 13 ? officeRef.current.focus() : null}
                            className={classes.userMail}
                            validateType={"mail"}
                        />
                        <TextInput
                            onChangeText={e => setOfficeName(e)}
                            className={classes.officeName}
                            referance={officeRef}
                            onKeyUp={e => e.keyCode === 13 ? userNameRef.current.focus() : null}
                            title="Ofis Adı"
                            value={officeName}
                            validateType={"name"}
                        />
                        <TextInput
                            value={userName}
                            onChangeText={e => setUserName(e)}
                            referance={userNameRef}
                            onKeyUp={e => e.keyCode === 13 ? passwordRef.current.focus() : null}
                            title="Kullanıcı Adı"
                            className={classes.userName}
                            validateType={"userName"}
                        />
                        <TextInput
                            onChangeText={e => setPassword(e)}
                            className={classes.password}
                            title="Parolanız"
                            referance={passwordRef}
                            onKeyUp={e => {
                                if(e.keyCode === 13) {
                                    setLoading(true);
                                    signupUser();
                                }
                            }}
                            value={password}
                            type="password"
                        />
                        <Button
                            value="Kayıt Ol"
                            onClick={() => {
                                setLoading(true);
                                signupUser();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
export default injectSheet(styleMain)(Login);