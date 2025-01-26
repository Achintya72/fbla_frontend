"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth } from "./firebase";
import { LoginContextData, Role } from "@/models/login";

const LoginContext = createContext<LoginContextData>({
    authUser: null,
    populated: false,
    role: "student",
    name: "",
    populateUser: (user: User) => { }
});

function LoginContextProvider({ children }: PropsWithChildren) {
    const [authUser, changeAuthUser] = useState<User | null>(null);
    const [populated, changePopulated] = useState<boolean>(false);
    const [role, changeRole] = useState<Role>("student");
    const [name, changeName] = useState<string>("");

    /**
     * Updates role and username based on the user's display name
     * @param user - user to populate the context with
     */
    const populateUser = (user: User) => {
        const userName = user.displayName;
        const [r, name] = userName?.split("_") || ["student", ""] as [Role, string];
        changeRole(r as Role);
        changeName(name);
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            changeAuthUser(user);
            changePopulated(true);
            if (user) {
                populateUser(user);
            } else {
                changeRole("student");
                changeName("");
            }
        });
    }, [])

    const values: LoginContextData = {
        authUser,
        populated,
        populateUser,
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