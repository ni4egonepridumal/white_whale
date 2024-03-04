// измени тайп на пассворд в инпуте пассворд
import { Link } from "react-router-dom";
import { Button } from "../../components/Button"
import { Input } from "../../components/Input";
import styles from "./Registration.module.scss"
import { useState, } from "react"
import { getInputs, handleChange, validate } from "../../utils/validationForm";
import { useAppDispatch } from "../../store/hooks";
import { fetchRegistration } from "../../store/user/user.actions";

export const Registration = () => {
    const [formValidState, setFormValidState] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [errorsMessage, setErrorsMessage] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [errorsStatus, setErrorsStatus] = useState({
        name: false,
        email: false,
        password: false,
    })

    const dispatch = useAppDispatch()

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormValidState({
    //         ...formValidState,
    //         [name]: value,
    //     });
    // };

    // const getInputs = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     //@ts-ignore
    //     const formData = new FormData(e.target);
    //     const formProps = Object.fromEntries(formData);
    //     let isFormValid: boolean = true
    //     // name
    //     if (!formProps.name?.trim().length) {
    //         setFormValidState((state) => ({ ...state, name: formValidState.name }))
    //         setErrorsStatus((state) => ({ ...state, name: true }))
    //         setErrorsMessage((state) => ({ ...state, name: "поле обязательно" }))
    //         isFormValid = false
    //     } else {
    //         setErrorsMessage((state) => ({ ...state, name: "" }))
    //         setErrorsStatus((state) => ({ ...state, name: false }))
    //     }
    //     //email
    //     if (!formProps.email?.trim().length) {
    //         setFormValidState((state) => ({ ...state, email: formValidState.email }))
    //         setErrorsStatus((state) => ({ ...state, email: true }))
    //         setErrorsMessage((state) => ({ ...state, email: "поле обязательно" }))
    //         isFormValid = false
    //     } else {
    //         setErrorsMessage((state) => ({ ...state, email: "" }))
    //         setErrorsStatus((state) => ({ ...state, email: false }))
    //     }
    //     //password
    //     if (!formProps.password?.trim().length) {
    //         setFormValidState((state) => ({ ...state, password: formValidState.password }))
    //         setErrorsStatus((state) => ({ ...state, password: true }))
    //         setErrorsMessage((state) => ({ ...state, password: "поле обязательно" }))
    //         isFormValid = false
    //     } else {
    //         setErrorsMessage((state) => ({ ...state, password: "" }))
    //         setErrorsStatus((state) => ({ ...state, password: false }))
    //     }
    //     if (!isFormValid) {
    //         return;
    //     }
    // };

    // const validate = () => {
    //     // name
    //     if (!formValidState.name?.trim().length) {
    //         setFormValidState((state) => ({ ...state, name: formValidState.name }))
    //         setErrorsStatus((state) => ({ ...state, name: true }))
    //         setErrorsMessage((state) => ({ ...state, name: "поле обязательно" }))
    //     } else if (formValidState.name.length <= 3) {
    //         setErrorsStatus((state) => ({ ...state, name: true }))
    //         setErrorsMessage((state) => ({ ...state, name: "имя длиннее 3 символов" }))
    //     }
    //     else {
    //         setErrorsStatus((state) => ({ ...state, name: false }))
    //         setErrorsMessage((state) => ({ ...state, name: "" }))
    //     }
    //     // email
    //     if (!formValidState.email?.trim().length) {
    //         setFormValidState((state) => ({ ...state, email: formValidState.email }))
    //         setErrorsStatus((state) => ({ ...state, email: true }))
    //         setErrorsMessage((state) => ({ ...state, email: "поле обязательно" }))
    //     } else if (!/\S+@\S+\.\S+/.test(formValidState.email)) {
    //         setErrorsStatus((state) => ({ ...state, email: true }))
    //         setErrorsMessage((state) => ({ ...state, email: "введите корректный email" }))
    //     }
    //     else {
    //         setErrorsStatus((state) => ({ ...state, email: false }))
    //         setErrorsMessage((state) => ({ ...state, email: "" }))
    //     }
    //     // password
    //     if (!formValidState.password?.trim().length) {
    //         setFormValidState((state) => ({ ...state, password: formValidState.password }))
    //         setErrorsStatus((state) => ({ ...state, password: true }))
    //         setErrorsMessage((state) => ({ ...state, password: "поле обязательно" }))
    //     }
    //     else {
    //         setErrorsStatus((state) => ({ ...state, password: false }))
    //         setErrorsMessage((state) => ({ ...state, password: "" }))
    //     }
    // }

    const registrationUser = () => {
        if (errorsMessage.email.length > 1 || errorsMessage.name.length > 1 || errorsMessage.password.length > 1 || errorsStatus.email === true || errorsStatus.name === true || errorsStatus.password === true) {
            console.log("есть ошибки")
        } else {
            dispatch(fetchRegistration(formValidState))
        }
    }

    return (
        <div className={styles.container}>
            {/* в данном случае библиотеку classnames не использую, для наглядности */}
            <div className={styles.innerForm}>
                <form className={styles.form} onSubmit={(e) => { getInputs(e, formValidState, setFormValidState, setErrorsStatus, setErrorsMessage), registrationUser() }}>
                    <div className={styles.field}>
                        <label htmlFor="name">Имя</label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="name"
                            className={`${errorsStatus.name ? styles.invalid : ""}`}
                            value={formValidState.name}
                            onChange={(e) => handleChange(e, formValidState, setFormValidState)}
                            onBlur={() => validate(formValidState, setErrorsStatus, setFormValidState, setErrorsMessage)}
                        />
                        {errorsMessage.name.length > 1 ? <p style={{ color: 'red' }}>{errorsMessage?.name}</p> : null}
                    </div>
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

                    <Button>Зарегистрироваться</Button>
                </form>
                <div className={styles.bottom}>
                    <div>Уже есть аккаунт ?</div>
                    <div style={{ color: "#646cff" }}><Link to="/authorization">Авторизоваться!</Link></div>
                </div>
            </div>
        </div>
    );
};


