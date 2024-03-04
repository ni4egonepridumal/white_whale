import { useState, useEffect } from "react";
import { Input } from "../../components/Input";
import styles from "./Authorization.module.scss"
import { fetchAuthorization } from "../../store/user/user.actions";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { getInputs, handleChange, validate } from "../../utils/validationForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from 'react-router-dom'


export const Authorization = () => {

    const [formValidState, setFormValidState] = useState({
        email: '',
        password: '',
    })
    const [errorsMessage, setErrorsMessage] = useState({
        email: '',
        password: '',
    })
    const [errorsStatus, setErrorsStatus] = useState({
        email: false,
        password: false,
    })
    const dispatch = useAppDispatch()

    const { isError, isLoaded, status } = useAppSelector(state => state.authorization)

    const navigate = useNavigate()

    useEffect(() => {
        if (isError === null && status === 'success') {
            navigate("/user")
        }
    }, [isError, status, navigate])
    // перед авторизацией проверяем на отсутствие ошибок
    const authorizationUser = () => {
        if (errorsMessage.email.length > 1 || errorsMessage.password.length > 1 || errorsStatus.email === true || errorsStatus.password === true) {
            console.log("есть ошибки")
        } else {
            dispatch(fetchAuthorization(formValidState))
        }
    }
    return (
        <div className={styles.container}>
            {/* в данном случае библиотеку classnames не использую, для наглядности */}
            <div className={styles.innerForm}>
                <form className={styles.form} onSubmit={(e) => { authorizationUser(); getInputs(e, formValidState, setFormValidState, setErrorsStatus, setErrorsMessage) }}>
                    <div className={styles.field}>
                        <label htmlFor="email">Эл.ящик</label>
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            placeholder="email"
                            className={`${errorsStatus.email ? styles.invalid : ""}`}
                            value={formValidState.email}
                            onChange={(e) => handleChange(e, formValidState, setFormValidState)}
                            onBlur={() => validate(formValidState, setErrorsStatus, setFormValidState, setErrorsMessage)}
                        />
                        {errorsMessage.email.length > 1 ? <p style={{ color: 'red' }}>{errorsMessage?.email}</p> : null}
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">Пароль</label>
                        <Input
                            id="password"
                            type="text"
                            name="password"
                            placeholder="password"
                            className={`${errorsStatus.password ? styles.invalid : ""}`}
                            value={formValidState.password}
                            // функция handleChange используется для валидации пустых инпутов при первом клике и для контролиуемых инпутов
                            onChange={(e) => handleChange(e, formValidState, setFormValidState)}
                            // функция validate используется для валидации и отображения ошибок когда покидают инпут
                            onBlur={() => validate(formValidState, setErrorsStatus, setFormValidState, setErrorsMessage)}
                        />
                        {errorsMessage.password.length > 1 ? <p style={{ color: 'red' }}>{errorsMessage?.password}</p> : null}
                    </div>
                    {isError ? <p style={{ color: 'red' }}>{isError}</p> : null}
                    {isLoaded ? <Button>Загрузка...</Button> : <Button>Войти</Button>}
                </form>
                <div className={styles.bottom}>
                    <div>Еще нет аккаунта ?</div>
                    <div style={{ color: "#646cff" }}><Link to="/registration">Зарегистрироваться!</Link></div>
                </div>
            </div>
        </div>
    );
};

