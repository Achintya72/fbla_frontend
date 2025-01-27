"use client";
import { useContext, useState } from "react";
import LoginContext from "@/repositories/loginContext";
import { LoginContextData } from "@/models/login";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "@/repositories/firebase";
import { FirebaseError } from "firebase/app";
import delay from "@/utils/delay";

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
 * resetError: function
 */
export const useLoginUser: () => [string, () => void, boolean, (email: string, password: string) => void] = () => {
    const [error, changeError] = useState<string>("");
    const [loading, changeLoading] = useState<boolean>(false);

    const resetError = () => {
        changeError("");
    }

    /**
     * Logs in the user
     * @param email
     * @param password
     * @return void
     */
    const loginUser = async (email: string, password: string) => {
        resetError();
        try {
            changeLoading(true);
            await delay(1000);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error instanceof FirebaseError) {
                switch (error.message) {
                    case "Firebase: Error (auth/invalid-credential).":
                        changeError("Invalid email or password");
                        break
                    default:
                        changeError(error.message);
                }
            } else {
                changeError("Something weird happened. Please try again later");
            }
        } finally {
            changeLoading(false);
        }
    };

    return [error, resetError, loading, loginUser];
};

/**
 * Custom hook to create user
 * @returns [error, resetError, loading, createUser]
 */
export const useCreateUser: () => [string, () => void, boolean, (name: string, email: string, password: string) => void] = () => {
    const [error, changeError] = useState<string>("");
    const [loading, changeLoading] = useState<boolean>(false);
    const { populateUser } = useLoginContext();

    const resetError = () => {
        changeError("");
    }

    const createUser = async (name: string, email: string, password: string) => {
        try {
            changeLoading(true);
            await delay(1000);
            await createUserWithEmailAndPassword(auth, email, password);
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: `student_${name}` });
                populateUser(auth.currentUser);
                changeError("");
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                switch (error.message) {
                    case "Firebase: Error (auth/email-already-in-use).":
                        changeError("Account already exists");
                        break
                    default:
                        changeError(error.message);
                }
            } else {
                changeError("Something weird happened. Please try again later");
            }
        } finally {
            changeLoading(false);
        }
    }
    return [error, resetError, loading, createUser];
}

/**
 * Custom hook to create user
 * @returns [error, resetError, loading, createUser]
 */
export const useCreateRecruiter: () => [string, () => void, boolean, (name: string, email: string, password: string) => void] = () => {
    const [error, changeError] = useState<string>("");
    const [loading, changeLoading] = useState<boolean>(false);
    const { populateUser } = useLoginContext();

    const resetError = () => {
        changeError("");
    }

    const createRecruiter = async (name: string, email: string, password: string) => {
        try {
            changeLoading(true);
            await delay(1000);
            await createUserWithEmailAndPassword(auth, email, password);
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: `recruiter_${name}` });
                populateUser(auth.currentUser);
                changeError("");
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                switch (error.message) {
                    case "Firebase: Error (auth/email-already-in-use).":
                        changeError("Account already exists");
                        break
                    default:
                        changeError(error.message);
                }
            } else {
                changeError("Something weird happened. Please try again later");
            }
        } finally {
            changeLoading(false);
        }
    }
    return [error, resetError, loading, createRecruiter];
}

/**
 * Custom hook to logout user
 * @returns [loading, error, resetError, logoutUser]
 * loading: boolean
 * error: string
 * resetError: function
 * logoutUser: function
 */
export const useLogout: () => [boolean, string, () => void, () => void] = () => {
    const [loading, changeLoading] = useState<boolean>(false);
    const [error, changeError] = useState<string>("");

    const resetError = () => {
        changeError("");
    }

    const logoutUser = async () => {
        try {
            changeLoading(true);
            await delay(1000);
            await signOut(auth);
        } catch (error) {
            if (error instanceof FirebaseError) {
                changeError(error.message);
            } else {
                changeError("Something weird happened. Please try again later");
            }
        } finally {
            changeLoading(false);
        }
    }

    return [loading, error, resetError, logoutUser];
}