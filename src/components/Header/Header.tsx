// чекни недочеты тут 
import { Link } from "react-router-dom";
import styles from "./Header.module.scss"
import { JWT_token } from "../../services/auth/auth.service";

export const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div><Link to={"/"}>ЛОГОТИП</Link></div>
                <div>
                    {JWT_token === null ?
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

