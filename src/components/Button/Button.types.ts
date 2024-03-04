import { ButtonHTMLAttributes, ReactNode } from "react";

// создадим интерфейс для кнопки, в котором, используем ReactNode для расширения всех стандартных пропсов для кнопки

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  appearance?: "big" | "small";
  color?: string;
  disabled?: boolean;
}
