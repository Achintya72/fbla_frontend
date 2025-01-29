import classes from "@/utils/classes"
import { InputHTMLAttributes } from "react"
import { FieldValues, Path, UseFormRegister, FieldError, RegisterOptions } from "react-hook-form"

interface RadioButtonGroupProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    name: Path<T>,
    register: UseFormRegister<T>,
    error: FieldError | undefined,
    options: string[],
    formOptions?: RegisterOptions<T, Path<T>>,
    grow?: boolean
}

export default function RadioButtonGroup<T extends FieldValues>({ label, name, register, error, options, formOptions, className, grow = false, ...props }: RadioButtonGroupProps<T>) {
    return (
        <div className={classes(grow ? "flex-1" : "", "flex flex-col gap-[6px] items-stretch justify-start")}>
            <label>{label}</label>
            {options.map((option) => (
                <div key={option} className="flex flex-row gap-[5px]">
                    <input
                        {...register(name, formOptions)}
                        id={label + "-" + option}
                        {...props}
                        value={option}
                        type={'radio'}
                        onSubmit={(e) => e.preventDefault()}
                        className={
                            classes(
                                className ?? "",
                                "font-inter bg-white-100",
                                error ? "!outline-red-400" : "focus:outline-blue-400",
                                "p-[16px] rounded-[8px]"
                            )
                        }
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </div>
            ))}
            {error && <small className="text-red-400">{error.message}</small>}
        </div>
    )
}