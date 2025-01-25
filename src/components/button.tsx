import classes from "@/app/utils/classes";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'large',
    variant?: 'primary' | 'secondary' | "text"
}

export default function Button({ children, disabled, size = "large", variant = "primary", onClick, ...props }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            {...props}
            disabled={disabled}
            className={
                classes(
                    disabled ? "cursor-not-allowed !bg-white-700" : "",
                    'rounded-[8px]',
                    variant !== "text" ? (size == 'small' ? 'px-[16px] py-[8px]' : 'px-[32px] py-[16px]') : "",
                    variant == 'primary' ? 'bg-white-900 text-white-100' : variant == "secondary" ? 'bg-white-400 text-white-800' : "text-white-900"
                )
            }>
            {children}
        </button>
    )
}