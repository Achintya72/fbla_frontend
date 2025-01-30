"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth } from "../repositories/firebase";
import { LoginContextData, Role, UserJWT } from "@/models/login";
import { jwtDecode } from "jwt-decode";
import { useLoginCacheUser } from "@/services/login";

const LoginContext = createContext<LoginContextData>({
    authUser: false,
    populated: false,
    role: "student",
    name: "",
    populateUser: () => { },
    reset: () => {},
});

function LoginContextProvider({ children }: PropsWithChildren) {
    const [authUser, changeAuthUser] = useState<boolean>(false);
    const [populated, changePopulated] = useState<boolean>(false);
    const [role, changeRole] = useState<Role>("student");
    const [name, changeName] = useState<string>("");
    const loginUserFromCache = useLoginCacheUser();

    /**
     * Updates role and username based on the user's display name
     * @param user - user to populate the context with
     */
    const populateUser = (token: string) => {
        console.log(token);
        const decoded: UserJWT = jwtDecode(token);
        changeAuthUser(true);
        changeRole(decoded.rol as Role);
        changeName(decoded.dis ?? "");
        changePopulated(true);
    }

    useEffect(() => {
        loginUserFromCache(populateUser);
    }, [])

    /**
     * Resets role, username, and authUser on logout
     */
    const reset = () => {
        changeAuthUser(false);
        changeRole("student");
        changeName("");
    }

    const values: LoginContextData = {
        authUser,
        populated,
        populateUser,
        role,
        name,
        reset,
    }

    return (
        <LoginContext.Provider value={values}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;
export { LoginContextProvider };