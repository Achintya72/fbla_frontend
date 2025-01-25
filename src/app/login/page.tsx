"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { FieldValues, useForm } from "react-hook-form";
import { login } from "./actions";
import { useActionState } from "react";
import { redirect } from "next/navigation";

interface LoginForm extends FieldValues, FormData {
    name: string,
    email: string,
    password: string
}

export default function Login() {
    const [, loginAction] = useActionState(login, undefined);
    const { register, formState: { errors }, } = useForm<LoginForm>({
        mode: "all",
        reValidateMode: "onChange"
    });
    return (
        <main className="px-[60px] flex gap-[40px]" style={{
            height: "calc(100vh - 200px)"
        }}>
            <form action={loginAction} className="flex flex-col justify-center flex-1 gap-[20px]">
                <h2>Login</h2>
                <Input<LoginForm>
                    register={register}
                    error={errors.name}
                    label="name"
                    name="name"
                    options={{
                        required: "Required Field"
                    }}

                />
                <Input<LoginForm>
                    register={register}
                    error={errors.email}
                    label="email"
                    name="email"
                    options={{
                        required: "Required Field",
                        pattern: { value: /^\d{7}@lwsd\.org$/, message: "School emails only" }
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
                // disabled={errors.email != null || errors.password != null || errors.name != null }
                >Log In</Button>
                <Button type="button" onClick={e => {
                    redirect("/signup");
                }} variant="secondary">I Don&apos;t Have An Account</Button>
            </form>
            <div className="flex-1 bg-green-100 rounded-[40px]">

            </div>
        </main>
    )
}