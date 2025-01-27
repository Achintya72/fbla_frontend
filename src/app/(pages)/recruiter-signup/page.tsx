"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { FieldValues, useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { useCreateRecruiter, useLoginContext } from "@/services/login";
import Error from "@/components/Error";
import { useEffect } from "react";

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
    const [error, changeError, loading, createRecruiter] = useCreateRecruiter();
    const context = useLoginContext();

    const onSubmit = async (data: SignUpForm) => {
        await createRecruiter(data.name, data.email, data.password);
    }

    useEffect(() => {
        if (context.authUser) {
            redirect("/dashboard");
        }
    }, [context.authUser])

    return (
        <main className="px-[60px] flex flex-row-reverse gap-[40px]" style={{
            height: "calc(100vh - 200px)"
        }}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center flex-1 gap-[20px]">
                <h2>Recruiter Sign Up</h2>
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
                        pattern: {
                            value: /^\S+@\S+\.\S+$/, message: "School emails only"
                        }
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
                <Button type="button" onClick={() => {
                    redirect("/signup");
                }} variant="secondary">I&apos;m Not A Recruiter</Button>
            </form>
            <div className="flex-1 bg-green-100 rounded-[40px]">

            </div>
            <Error error={error} resetError={changeError} />
        </main>
    )
}