"use client";
import { useContext, useState } from "react";
import LoginContext from "@/serviceProviders/loginContext";
import { LoginContextData, Role } from "@/models/login";
import { loginUserRepo, createUserRepo, validateJWTRepo } from "@/repositories/login.repository";
import { deleteUserRepo, retrieveUserFromCacheRepo, setUserInCacheRepo } from "@/repositories/loginCache.respository";

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
    const { populateUser } = useLoginContext();

    const resetError = () => {
        changeError("");
    }

    /**
     * Logs in the user
     * @param email
     * @param password
     * @return void
     */
    const login = async (email: string, password: string) => {
        resetError();
        try {
            changeLoading(true);
            const token = await loginUserRepo(email, password);
            setUserInCacheRepo(token);
            populateUser(token);
        } catch (error) {
            if (error instanceof Error) {
                changeError(error.message);
            } else {
                changeError("Something weird happened. Please try again later");
            }
        } finally {
            changeLoading(false);
        }
    };

    return [error, resetError, loading, login];
};

/**
 * Custom hook to create user
 * @returns [error, resetError, loading, createUser]
 */
export const useCreateUser: () => [string, () => void, boolean, (email: string, password: string, name: string, role: Role) => void] = () => {
    const [error, changeError] = useState<string>("");
    const [loading, changeLoading] = useState<boolean>(false);
    const { populateUser } = useLoginContext();

    const resetError = () => {
        changeError("");
    }

    const signup = async (email: string, password: string, name: string, role: Role) => {
        resetError();
        try {
            changeLoading(true);
            const token = await createUserRepo(email, password, name, role);
            setUserInCacheRepo(token);
            populateUser(token);
        } catch (error) {
            if (error instanceof Error) {
                changeError(error.message);
            } else {
                changeError("Something weird happened. Please try again later");
            }
        } finally {
            changeLoading(false);
        }
    }
    return [error, resetError, loading, signup];
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
    const { reset } = useLoginContext();

    const resetError = () => {
        changeError("");
    }

    const logoutUser = async () => {
        resetError();
        try {
            changeLoading(true);
            deleteUserRepo();
            reset();
        } catch (error) {
            if (error instanceof Error) {
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

export const useLoginCacheUser = () => {

    const loginUserFromCache: (populateUser: (token: string) => void, reset: () => void) => Promise<void> = async (populateUser, reset) => {
        const token = retrieveUserFromCacheRepo();
        if (token) {
            const result = await validateJWTRepo(token);
            if (result) {
                populateUser(token);
                return;
            } else {
                deleteUserRepo();
            }
        }
        reset();
    }

    return loginUserFromCache;
}
