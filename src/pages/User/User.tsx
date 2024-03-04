import React, { useRef, useEffect, useState } from "react"
import { Button } from "../../components/Button"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchGetFiles, fetchPostFiles } from "../../store/media/media.actions"
import { fetchLogout } from "../../store/user/user.actions"
import styles from "./User.module.scss"
import { MediaItem } from "../../components/MediaItem"
import { IPropMedia } from "./User.types"
import { logout } from "../../store/user/userAuthorization.slice"
import { useNavigate } from "react-router-dom"
import { JWT_token } from "../../services/auth/auth.service"



export const User = () => {

    const [files, setNewFile] = React.useState([])
    const [addNewFile, setAddNewFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isImage, setIsImage] = useState(true);
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLInputElement>()
    const { isError, allMedia, isLoaded } = useAppSelector(state => state.getAllMedia)

    const isLoadedFromAddNewFile = useAppSelector(state => state.postMedia.isLoaded)
    const isLoadedFromRemoveMedia = useAppSelector(state => state.removeMedia.isLoaded)
    const navigate = useNavigate();
    const fetchData = () => {
        dispatch(fetchGetFiles())
    }

    const saveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFile([...e.target.files])
        setAddNewFile(e.target.files[0])
    }
    const handlePick = () => {
        ref.current.click()
    }

    const fetchPostData = () => {
        const data = new FormData();
        files.forEach(item => data.append('files[]', item))
        dispatch(fetchPostFiles(data))
        fetchData()
        setPreviewUrl(null)
    }

    const LogoutUser = () => {
        dispatch(fetchLogout(JWT_token.token))
        localStorage.removeItem('token')
        dispatch(logout())
        navigate('/authorization');
    }

    useEffect(() => {
        fetchData()
    }, [isLoadedFromAddNewFile, isLoadedFromRemoveMedia])

    useEffect(() => {
        if (!addNewFile) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        }
        reader.readAsDataURL(addNewFile);
        if (addNewFile?.type.startsWith('image/')) {
            setIsImage(true);
        } else {
            setIsImage(false);
        }
    }, [addNewFile]);
    console.log("ошибка из user", isError)
    return (
        <div className={styles.container}>
            <div>
                {allMedia.length !== 0 ?
                    <>
                        {isLoaded === false ?
                            <div>
                                <h3>Ваши файлы <span style={{ color: '#646cff' }}>{allMedia.length}</span> шт:</h3>
                                {allMedia.length >= 20 && <h3 style={{ color: 'red' }}>Вы достигли макисмального количества загруженных файлов</h3>}
                                {allMedia && allMedia?.map((item: IPropMedia) => <MediaItem key={item.id} media={item} />)}
                            </div>
                            :
                            <p>Загрузка...</p>
                        }
                    </>
                    :
                    <>
                        {isLoaded === false ?
                            <>
                                {isError === "Unauthenticated." ? <h2 style={{ color: 'red' }}>Вы не авторизованы</h2> : <p>У вас нет ни одного медиафайла</p>}
                            </>
                            :
                            <p>Загрузка...</p>
                        }
                    </>
                }
            </div>

            <div className={styles.image_inner}>

                {/* проверяем что отобразить для превью */}
                {previewUrl ? (
                    isImage ? (
                        <img className={styles.img} src={previewUrl} alt="Image Preview" />
                    ) : (
                        <img className={styles.img} src="/doc.png" alt="Document Preview" />
                    )
                ) : (
                    null
                )}
                <input
                    className={styles.hidden}
                    ref={ref}
                    type="file"
                    onChange={saveFiles}
                    multiple
                />
                {/*  */}
                <div className={styles.button_container}>
                    {isError !== "Unauthenticated." ?
                        <>
                            <Button disabled={allMedia.length >= 20 ? true : false} onClick={handlePick}>Выбрать файл</Button>
                            <Button onClick={fetchPostData}>Отправить файл</Button>
                            <Button color='red' onClick={LogoutUser}>Выйти из профиля</Button>
                        </>
                        : <Button color='red' onClick={() => navigate('/authorization')}>Авторизоваться</Button>}
                </div>
            </div>
        </div>
    );
};

