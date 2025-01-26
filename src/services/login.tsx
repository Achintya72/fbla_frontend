"use client";
import { useContext, useState } from "react";
import LoginContext from "@/repositories/loginContext";
import { LoginContextData } from "@/models/login";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/repositories/firebase";
import { FirebaseError } from "firebase/app";

export const useLoginContext: () => LoginContextData = () => {
    const context = useContext(LoginContext);
    return context;
};

/**
 * Custom hook to login user
 * @return [error, loading, loginUser]
 * error: string
 * loading: boolean
 * loginUser: function
 */
export const useLoginUser: () => [string, boolean, (email: string, password: string) => void] = () => {
    const [error, changeError] = useState<string>("");
    const [loading, changeLoading] = useState<boolean>(false);

    /**
     * 
     */
    const loginUser = async (email: string, password: string) => {
        try {
            changeLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error instanceof FirebaseError) {
                changeError(error.message);
            } else {
                changeError("Something weird happened. Please try again later");
            }
        } finally {
            changeLoading(false);
        }
    };

    return [error, loading, loginUser];
};
