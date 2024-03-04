//  начальное знвчение изВалид можно поставить тру ?? 
import cn from "classnames"
import { forwardRef } from "react";
import { InputProps } from "./Input.types";
import styles from "./Input.module.scss"


export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, isValid = true, value, onChange, onBlur, onFocus, ...props }, ref) {
    return (
        <input {...props} value={value} onChange={onChange} onBlur={onBlur} onFocus={onFocus} ref={ref} className={cn(className, styles.input, {
            [styles['invalid']]: !isValid
        })} />
    );
});
