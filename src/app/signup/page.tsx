"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { FieldValues, useForm } from "react-hook-form";
import { signup } from "./actions";
import { useActionState } from "react";
import { redirect } from "next/navigation";

interface SignUpForm extends FieldValues, FormData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function SignUp() {
    const [, signupAction] = useActionState(signup, undefined);
    const { register, formState: { errors }, watch } = useForm<SignUpForm>({
        mode: "all",
        reValidateMode: "onChange"
    });


    return (
        <main className="px-[60px] flex gap-[40px]" style={{
            height: "calc(100vh - 200px)"
        }}>
            <form action={signupAction} className="flex flex-col justify-center flex-1 gap-[20px]">
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
                        validate: (value) => value != watch('password') ? "Passwords do not match" : true
                    }}
                    type="password"
                />
                <Button type="submit"
                // disabled={errors.email != null || errors.password != null || errors.name != null }
                >Sign Up</Button>
                <Button type="button" onClick={() => {
                    redirect("/login");
                }} variant="secondary">I Have An Account</Button>
            </form>
            <div className="flex-1 bg-green-100 rounded-[40px]">

            </div>
        </main>
    )
}