import classes from "@/app/utils/classes";
import { InputHTMLAttributes } from "react";
import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    name: Path<T>,
    register: UseFormRegister<T>,
    error: FieldError | undefined,
    options?: RegisterOptions<T, Path<T>>,
    grow?: boolean
}

export default function Input<T extends FieldValues>({
    label,
    name,
    error,
    register,
    options,
    grow = false,
    className,
    ...props
}: InputProps<T>) {
    return (
        <div className={classes(grow ? "flex-1" : "", "flex flex-col gap-[6px] items-stretch justify-start")}>
            <label htmlFor={label}>{label}</label>
            <input
                {...register(name, options)}
                id={label}
                {...props}
                onSubmit={(e) => e.preventDefault()}
                className={
                    classes(
                        className ?? "",
                        "font-inter bg-white-100 outline outline-1 outline-white-500",
                        error ? "!outline-red-400" : "focus:outline-blue-400",
                        "p-[16px] rounded-[8px]"
                    )
                }
            />
            {error && <small className="text-red-400">{error.message}</small>}
        </div>
    )
}