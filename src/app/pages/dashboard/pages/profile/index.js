import React, {
    useEffect,
    useState,
    useRef
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import useGlobalState from '../../../../context';
import {
    TextInput,
    Button
} from '../../../../components';

const Profile = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [newRePassword, setNewRePassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [data, setData] = useState({
        "profilePhoto": "https://i2.milimaj.com/i/milliyet/75/1200x675/5ca1c9c045d2a029641a7362.jpg",
        "registerDate": "19/05/1997",
        "fullName": "Mahmut TUNCER",
        "userName": "mahmuttuncer"
    });
    const {
        colors
    } = globalState.theme;

    const newRePasswordRef = useRef();
    const newPasswordRef = useRef();

    useEffect(() => {
        setGlobalState({
            modal: {
                ...globalState.modal,
                isActive: false
            }
        });
    }, []);

    const submit = () => {
        alert("submit data");
    };

    return <div
        className={classes.container}
    >
        {
            data ?
                <div>
                    <div
                        className={classes.profilData}
                    >
                        <img
                            className={classes.photo}
                            src={data.profilePhoto}
                            height="350px"
                            width="100%"
                        />
                        <div
                            className={classes.info}
                            style={{
                                backgroundColor: colors.background
                            }}
                        >
                            <div
                                className={classes.infoTitle}
                            >
                                {data.fullName}
                            </div>
                            <div
                                className={classes.infoContent}
                            >
                                @{data.userName}
                            </div>
                        </div>
                        <div
                            className={classes.date}
                            style={{
                                backgroundColor: colors.layer1
                            }}
                        >
                            Kayıt Tarihi:<span>{data.registerDate}</span>
                        </div>
                    </div>
                    <div
                        className={classes.passwordContainer}
                        style={{
                            backgroundColor: colors.background
                        }}
                    >
                        <TextInput
                            onKeyUp={e => e.keyCode === 13 ? newPasswordRef.current.focus() : null}
                            onChangeText={e => setOldPassword(e)}
                            className={classes.input}
                            placeholder="Eski Şifre"
                            value={oldPassword}
                        />
                        <TextInput
                            onKeyUp={e => e.keyCode === 13 ? newRePasswordRef.current.focus() : null}
                            onChangeText={e => setOldPassword(e)}
                            referance={newPasswordRef}
                            className={classes.input}
                            placeholder="Yeni Şifre"
                            value={oldPassword}
                        />
                        <TextInput
                            onKeyUp={e => e.keyCode === 13 ? submit() : null}
                            onChangeText={e => setOldPassword(e)}
                            placeholder="Yeni Şifre Tekrar"
                            referance={newRePasswordRef}
                            className={classes.input}
                            value={oldPassword}
                        />
                        <Button
                            className={classes.submit}
                            onClick={() => submit()}
                            textColor={colors.body}
                            color={colors.primary}
                            value="Kayıt Et"
                        />
                    </div>
                </div>
                :
                <div
                    className={classes.loading}
                    style={{
                        backgroundColor: colors.background
                    }}
                >
                    <img
                        src="/assets/images/preload.png"
                    />
                </div>
        }
    </div>;
};
export default injectSheet(stylesheet)(Profile);