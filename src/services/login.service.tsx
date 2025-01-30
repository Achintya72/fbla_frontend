"use client";
import { useContext, useState } from "react";
import LoginContext from "@/serviceProviders/loginContext";
import { LoginContextData, Role } from "@/models/login";
import { loginUser, createUser, validateJWT } from "@/repositories/login.repository";
import { deleteUser, retrieveUserFromCache, setUserInCache } from "@/repositories/loginCache.respository";

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
            const token = await loginUser(email, password);
            setUserInCache(token);
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
            const token = await createUser(email, password, name, role);
            setUserInCache(token);
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
            deleteUser();
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
        const token = retrieveUserFromCache();
        if (token) {
            const result = await validateJWT(token);
            if (result) {
                populateUser(token);
                return;
            } else {
                deleteUser();
            }
        }
        reset();
    }

    return loginUserFromCache;
}
