"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth } from "./firebase";
import { LoginContextData, Role } from "@/models/login";

const LoginContext = createContext<LoginContextData>({
    authUser: null,
    populated: false,
    role: "student",
    name: ""
});

function LoginContextProvider({ children }: PropsWithChildren) {
    const [authUser, changeAuthUser] = useState<User | null>(null);
    const [populated, changePopulated] = useState<boolean>(false);
    const [role, changeRole] = useState<Role>("student");
    const [name, changeName] = useState<string>("");

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            changeAuthUser(user);
            changePopulated(true);
            if (user) {
                const userName = user.displayName;
                const [r, name] = userName?.split("_") || ["student", ""] as [Role, string];
                changeRole(r as Role);
                changeName(name);
            }
        });
    }, [])

    const values: LoginContextData = {
        authUser,
        populated,
        role,
        name
    }

    return (
        <LoginContext.Provider value={values}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;
export { LoginContextProvider };