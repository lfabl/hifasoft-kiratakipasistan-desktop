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

    const signupUser = async () => {
        if (userName === "" || password === "" || officeName === "" || userMail === "") {
            console.log({
                errorMessage: "Lütfen istenilen her bilgiyi doldurduğunuzdan emin olunuz."
            })
        }
        else if (password.length < 5 || password.length > 80) {
            console.log({
                errorMessage: "Gönderdiğiniz şifre gerekli kuralları sağlamıyor. Lütfen minimum 5 maximum 80 karakter girin!"
            })
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
                console.log(signupResult);
                await ipcRenderer.sendSync("setUserData", {
                    token: signupResult.token
                });
                
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
                    console.log({
                        errorMessage: "Gönderdiğiniz kullanıcı adı gerekli kuralları sağlamıyor. Lütfen minimum 3 maximum 35 karakter girin!"
                    })
                }
                else if (signupResult.message.indexOf("mail") !== -1) {
                    console.log({
                        errorMessage: "Gönderdiğiniz mail gerekli kuralları sağlamıyor. Lütfen minimum 5 maximum 80 karakter girin!"
                    })
                }
                else if (signupResult.message.indexOf("fullName") !== -1) {
                    console.log({
                        errorMessage: "Gönderdiğiniz ofis adı gerekli kuralları sağlamıyor. Lütfen minimum 4 maximum 45 karakter girin!"
                    })
                }
                else {
                    console.log({
                        errorMessage: signupResult.message
                    })
                }
            }
        }
        setLoading(false);
    }

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