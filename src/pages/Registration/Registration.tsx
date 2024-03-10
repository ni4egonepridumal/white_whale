import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import styles from './Registration.module.scss';
import { useState } from 'react';
import { getInputs, handleChange, validate } from '../../utils/validationForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRegistration } from '../../store/user/user.actions';

export const Registration = () => {

    const [formValidState, setFormValidState] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errorsMessage, setErrorsMessage] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errorsStatus, setErrorsStatus] = useState({
        name: false,
        email: false,
        password: false
    });

    const dispatch = useAppDispatch();
    const { isError, isLoaded } = useAppSelector(state => state.registration);
    const navigate = useNavigate();
    // проверяем на отсутствие ошибок перед регистрацией

    const registrationUser = () => {
        if (errorsMessage.email.length > 1 || errorsMessage.name.length > 1 || errorsMessage.password.length > 1 || errorsStatus.email === true || errorsStatus.name === true || errorsStatus.password === true) {
            console.log('есть ошибки');
        } else {
            dispatch(fetchRegistration(formValidState));
            navigate('/authorization');
        }
    };

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
                            className={`${errorsStatus.name ? styles.invalid : ''}`}
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
                            className={`${errorsStatus.email ? styles.invalid : ''}`}
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
                            type="password"
                            name="password"
                            placeholder="password"
                            className={`${errorsStatus.password ? styles.invalid : ''}`}
                            value={formValidState.password}
                            // функция handleChange используется для валидации пустых инпутов при первом клике и для контролиуемых инпутов
                            onChange={(e) => handleChange(e, formValidState, setFormValidState)}
                            // функция validate используется для валидации и отображения ошибок когда покидают инпут
                            onBlur={() => validate(formValidState, setErrorsStatus, setFormValidState, setErrorsMessage)}
                        />
                        {errorsMessage.password.length > 1 ? <p style={{ color: 'red' }}>{errorsMessage?.password}</p> : null}
                    </div>

                    <Button>Зарегистрироваться</Button>
                    {isLoaded === true ? <p>Загрузка ...</p> : null}
                </form>
                {isError && <p style={{ color: 'red' }}>Ошибка сервера, попробуйте позже</p>}
                <div className={styles.bottom}>
                    <div>Уже есть аккаунт ?</div>
                    <div style={{ color: '#646cff' }}><Link to="/authorization">Авторизоваться!</Link></div>
                </div>
            </div>
        </div>
    );
};


