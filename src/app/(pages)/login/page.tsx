"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { FieldValues, useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { useLoginContext, useLoginUser } from "@/services/login";
import Error from "@/components/Error";
import { useEffect } from "react";

interface LoginForm extends FieldValues, FormData {
    email: string,
    password: string
}

export default function Login() {
    const { register, handleSubmit, formState: { errors }, } = useForm<LoginForm>({
        mode: "all",
        reValidateMode: "onChange"
    });
    const [error, resetError, loading, loginUser] = useLoginUser();
    const context = useLoginContext();

    const onSubmit = async (data: LoginForm) => {
        await loginUser(data.email, data.password);
    }

    useEffect(() => {
        if (context.authUser) {
            redirect(`/dashboard/${context.role}`);
        }
    }, [context.authUser, context.role])


    return (
        <main className="px-[60px] flex gap-[40px]" style={{
            height: "calc(100vh - 200px)"
        }}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center flex-1 gap-[20px]">
                <h2>Login</h2>
                <Input<LoginForm>
                    register={register}
                    error={errors.email}
                    label="email"
                    name="email"
                    options={{
                        required: "Required Field",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Emails only" }
                    }}

                />
                <Input<LoginForm>
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
                <Button type="submit"
                    disabled={errors.email != null || errors.password != null}
                    loading={loading}>Log In</Button>
                <Button type="button" onClick={() => {
                    redirect("/signup");
                }} variant="secondary">I Don&apos;t Have An Account</Button>
            </form>
            <div className="flex-1 bg-green-100 rounded-[40px]">

            </div>
            <Error error={error} resetError={resetError} />
        </main>
    )
}