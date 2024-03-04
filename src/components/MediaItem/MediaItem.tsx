// типизация
import { fetchGetMedia, fetchRemoveMedia } from '../../store/media/media.actions';
import { Button } from '../Button';
import { IPropMedia } from './MediaItem.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './MediaItem.module.scss'

export const MediaItem = ({ media }: IPropMedia) => {
    const dispatch = useAppDispatch()
    const { isLoaded } = useAppSelector(state => state.getAllMedia)
    const DeleteItem = () => {
        dispatch(fetchRemoveMedia(media.id))
    }
    const SaveFile = () => {
        fetchGetMedia(media)
    }
    return (
        <div className={styles.container}>
            {isLoaded && <h1 style={{ color: 'red' }}>ЗАГРУЗКА</h1>}
            <p className={styles.paragraph}>{media.fileName}</p>
            <div className={styles.button}>
                <Button color="red" onClick={DeleteItem}>Удалить</Button>
                <Button onClick={SaveFile}>Скачать</Button>
            </div>
        </div>
    );
};

