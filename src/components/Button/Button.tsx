import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';
import cn from 'classnames';

export const Button = ({ children, className, appearance = 'big', color, disabled, ...props }: ButtonProps) => {
    return (
        <button className={cn(styles['button'], styles['accent'], className, {
            [styles['small']]: appearance === 'small',
            [styles['big']]: appearance === 'big',
            [styles['red']]: color === 'red',
            [styles['disabled']]: disabled === true
        })} {...props}
            disabled={disabled}>
            {children}
        </button>
    );
};
