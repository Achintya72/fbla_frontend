"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth } from "../repositories/firebase";
import { LoginContextData, Role, UserJWT } from "@/models/login";
import { jwtDecode } from "jwt-decode";

const LoginContext = createContext<LoginContextData>({
    authUser: null,
    populated: false,
    role: "student",
    name: "",
    populateUser: () => { }
});

function LoginContextProvider({ children }: PropsWithChildren) {
    const [authUser, changeAuthUser] = useState<boolean>(false);
    const [populated, changePopulated] = useState<boolean>(false);
    const [role, changeRole] = useState<Role>("student");
    const [name, changeName] = useState<string>("");

    /**
     * Updates role and username based on the user's display name
     * @param user - user to populate the context with
     */
    const populateUser = (token: string) => {
        const decoded: UserJWT = jwtDecode(token);
        changeAuthUser(true);
        changeRole(decoded.account_type);
        changeName(decoded.dis ?? "");
    }

    useEffect(() => {
        // return onAuthStateChanged(auth, (user) => {
        //     changeAuthUser(user);
        //     changePopulated(true);
        //     if (user) {
        //         populateUser(user);
        //     } else {
        //         changeRole("student");
        //         changeName("");
        //     }
        // });


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