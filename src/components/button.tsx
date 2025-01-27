import classes from "@/utils/classes";
import { ButtonHTMLAttributes } from "react";
import Loader from "./Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'large',
    variant?: 'primary' | 'secondary' | "text",
    loading?: boolean
}

export default function Button({ children, loading = false, disabled, size = "large", variant = "primary", onClick, ...props }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            {...props}
            disabled={loading || disabled}
            className={
                classes(
                    disabled ? "cursor-not-allowed !bg-white-700" : "",
                    'rounded-[8px]',
                    loading ? "cursor-loading" : "",
                    disabled ? "cursor-not-allowed" : "",
                    variant !== "text" ? (size == 'small' ? 'px-[16px] py-[8px]' : 'px-[32px] py-[16px]') : "",
                    variant == 'primary' ? 'bg-white-900 text-white-100' : variant == "secondary" ? 'bg-white-400 text-white-800' : "text-white-900"
                )
            }>
            {loading ? <Loader /> : children}
        </button>
    )
}