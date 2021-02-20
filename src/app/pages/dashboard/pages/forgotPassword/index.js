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
import forgetPassword from "../../../../server/fetchs/forgetPassword";

const ForgotPassword = ({
    classes,
    history
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [loading, setLoading] = useState(false);
    const [eMail, setEMail] = useState("");
    const {
        colors
    } = globalState.theme;

    const forgetPasswordUser = async () => {
        if (eMail === "") {
            setGlobalState({
                modal: {
                    isActive: true,
                    loading: false,
                    dialog: true,
                    data: {
                        title: "Hata!",
                        message: "Lütfen bir e-posta giriniz."
                    }
                }
            });
        }
        else {
            const forgetPasswordResult = await forgetPassword({
                mail: eMail,
            });
            
            if (forgetPasswordResult.code === 200) {
                setGlobalState({
                    modal: {
                        isActive: true,
                        loading: false,
                        dialog: true,
                        data: {
                            title: "Başarılı!",
                            message: "Parola sıfırlama bağlantısı gönderildi."
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
                            message: forgetPasswordResult.message
                        }
                    }
                });
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
                                Parolamı Sıfırla
                            </span>
                        </div>
                        <TextInput
                            value={eMail}
                            onChangeText={e => setEMail(e)}
                            placeholder="E - Posta Adresiniz"
                            className={classes.eMail}
                        />
                        <Button
                            value="Parolamı Sıfırla"
                            onClick={() => {
                                setLoading(true);
                                forgetPasswordUser();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
export default injectSheet(styleMain)(ForgotPassword);