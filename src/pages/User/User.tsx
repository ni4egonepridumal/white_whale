import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGetFiles, fetchPostFiles } from '../../store/media/media.actions';
import { fetchLogout } from '../../store/user/user.actions';
import styles from './User.module.scss';
import { MediaItem } from '../../components/MediaItem';
import { IPropMedia } from './User.types';
import { logout } from '../../store/user/userAuthorization.slice';
import { useNavigate } from 'react-router-dom';

export const User = () => {

    const [files, setNewFile] = React.useState([]);
    const [addNewFile, setAddNewFile] = useState<null | Blob>(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isImage, setIsImage] = useState(true);
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLInputElement>();

    const { isError, allMedia, isLoaded } = useAppSelector(state => state.getAllMedia);
    const { token } = useAppSelector(state => state.authorization);
    const isLoadedFromAddNewFile = useAppSelector(state => state.postMedia.isLoaded);
    const errorFromLoadFile = useAppSelector(state => state.postMedia.isError);
    const isLoadedFromRemoveMedia = useAppSelector(state => state.removeMedia.isLoaded);
    const navigate = useNavigate();
    const fetchData = () => {
        dispatch(fetchGetFiles());
    };
    // функция для прелоадера загруженных картинок, получает файлы для загрузки
    const saveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFile([...e.target.files]);
        setAddNewFile(e.target.files[0]);
    };
    const handlePick = () => {
        if (ref.current) {
            ref.current.click();
        }
    };
    // функция для отправки загруженных картинок
    const fetchPostData = () => {
        const data = new FormData();
        files.forEach(item => data.append('files[]', item));
        dispatch(fetchPostFiles(data));
        fetchData();
        setPreviewUrl(null);
    };

    const LogoutUser = () => {
        dispatch(logout());
        dispatch(fetchLogout(token));
        navigate('/authorization');
    };

    useEffect(() => {
        fetchData();
    }, [isLoadedFromAddNewFile, isLoadedFromRemoveMedia]);

    useEffect(() => {
        // проверяем, что отображать если загрузили картинку или файл
        if (!addNewFile) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(addNewFile);
        if (addNewFile?.type.startsWith('image/')) {
            setIsImage(true);
        } else {
            setIsImage(false);
        }
    }, [addNewFile]);
    return (
        <div className={styles.container}>
            <div>
                {allMedia.length !== 0 ?
                    <>
                        {isLoaded === false ?
                            <div>
                                <h3>Ваши файлы <span style={{ color: '#646cff' }}>{allMedia.length}</span> шт:</h3>
                                {allMedia.length >= 20 && <h3 style={{ color: 'red' }}>Вы достигли максимального количества загруженных файлов</h3>}
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
                                {isError !== 'Unauthenticated.' ?
                                    <p>У вас нет ни одного медиафайла</p>
                                    :
                                    <p>Вы не зарегистрированы или у вас нет профиля</p>}
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
                <div className={styles.button_container}>
                    {isError === 'Unauthenticated.' ?
                        <Button onClick={() => navigate('/authorization')}>Авторизоваться</Button>
                        :
                        <>
                            <Button disabled={allMedia.length >= 20 ? true : false} onClick={handlePick}>Выбрать файл</Button>
                            {errorFromLoadFile && <h4 style={{ color: 'red' }}>Ошибка !!!Размер файла не должен превышать 1мб</h4>}
                            <Button onClick={fetchPostData}>Отправить файл</Button>
                            <Button color='red' onClick={LogoutUser}>Выйти из профиля</Button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

