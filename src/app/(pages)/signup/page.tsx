"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { FieldValues, useForm } from "react-hook-form";
import { signup } from "./actions";
import { useActionState } from "react";
import { redirect } from "next/navigation";
import { useCreateUser, useLoginContext } from "@/services/login";
import Error from "@/components/Error";

interface SignUpForm extends FieldValues, FormData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
        mode: "all",
        reValidateMode: "onChange"
    });
    const [error, changeError, loading, createUser] = useCreateUser();
    const context = useLoginContext();

    console.log(context);

    const onSubmit = async (data: SignUpForm) => {
        await createUser(data.name, data.email, data.password);
    }


    return (
        <main className="px-[60px] flex flex-row-reverse gap-[40px]" style={{
            height: "calc(100vh - 200px)"
        }}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center flex-1 gap-[20px]">
                <h2>Sign Up</h2>
                <Input<SignUpForm>
                    register={register}
                    error={errors.name}
                    label="name"
                    name="name"
                    options={{
                        required: "Required Field"
                    }}

                />
                <Input<SignUpForm>
                    register={register}
                    error={errors.email}
                    label="email"
                    name="email"
                    options={{
                        required: "Required Field",
                        pattern: { value: /^\d{7}@lwsd\.org$/, message: "School emails only" }
                    }}

                />
                <Input<SignUpForm>
                    register={register}
                    error={errors.password}
                    label="password"
                    name="password"
                    options={{
                        required: "Field is required",
                        minLength: { value: 5, message: "Must be atleast 5 characters" }
                    }}
                    type="password"
                />
                <Input<SignUpForm>
                    register={register}
                    error={errors.confirmPassword}
                    label="confirm password"
                    name="confirmPassword"
                    options={{
                        required: "Field is required",
                        validate: (val: string, formValues) => {
                            if (val !== formValues.password) return "Passwords must match"
                        }
                    }}
                    type="password"
                />
                <Button type="submit" loading={loading}
                // disabled={errors.email != null || errors.password != null || errors.name != null }
                >Sign Up</Button>
                <Button type="button" onClick={() => {
                    redirect("/login");
                }} variant="secondary">I Have An Account</Button>
            </form>
            <div className="flex-1 bg-green-100 rounded-[40px]">

            </div>
            <Error error={error} resetError={changeError} />
        </main>
    )
}