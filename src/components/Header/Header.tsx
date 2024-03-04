import { Link } from "react-router-dom";
import styles from "./Header.module.scss"
import { useAppSelector } from "../../store/hooks";

export const Header = () => {
    const { token } = useAppSelector(state => state.authorization)
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div><Link to={"/"}>ЛОГОТИП</Link></div>
                <div>
                    {token === null ?
                        <p>
                            <Link to={"/registration"}>
                                <span>Регистрация/</span>
                            </Link>
                            <Link to={'/authorization'}>
                                <span>Авторизация</span>
                            </Link>
                        </p>
                        :
                        <p><Link to={'/user'}><img className={styles.img} src={'/no-profile.png'} /></Link></p>
                    }
                </div>
            </div>
        </div>
    );
};

