import { JobForm } from "@/app/(pages)/jobs/[id]/edit/page";
import classes from "@/utils/classes";
import { InputHTMLAttributes } from "react";
import { FieldValues, ArrayPath, Path, Merge, UseFormRegister, FieldError, RegisterOptions, useFieldArray, Control } from "react-hook-form";

interface MultiTextBoxInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: Path<JobForm>;
    register: UseFormRegister<JobForm>;
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    control: Control<JobForm, unknown>;
    options?: RegisterOptions<JobForm, Path<JobForm>>;
    grow?: boolean;
}

export default function MultiTextBoxInput<T extends FieldValues>({
    label,
    name,
    register,
    error,
    control,
    className,
    options,
    grow = false,
    ...props
}: MultiTextBoxInputProps) {
    const { fields, append, remove } = useFieldArray({ control, name: name as ArrayPath<JobForm> });

    return (
        <div className={classes(grow ? "flex-1" : "", "flex flex-col gap-[6px] items-stretch justify-start")}>
            <label>{label}</label>
            {fields.map((item, index) => (
                <div key={item.id} className="flex flex-row gap-[5px]">
                    <input
                        {...register(`${name}[${index}]` as Path<T>, options)}
                        id={label + "-" + item.id}  // Use item.id for a unique ID
                        {...props}
                        type="text"  // Changed to text for a multi-input field
                        className={classes(
                            className ?? "",
                            "font-inter bg-white-100",
                            error ? "!outline-red-400" : "focus:outline-blue-400",
                            "p-[16px] rounded-[8px]"
                        )}
                    />
                    {fields.length > 1 && (
                        <button type="button" onClick={() => remove(index)}>
                            Remove
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={() => append("")}>
                Add {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
            {error && <small className="text-red-400">{error.message}</small>}
        </div>
    );
}