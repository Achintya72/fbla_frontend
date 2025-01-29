// Set of methods responsible for interacting with browser cache for authentication

/**
 * Responsible for grabbing last authenticated user's JWT
 * from browser cache, in attempt to persist auth state
 * @returns 
 * Encoded User Auth Token, or nothing in case of no 
 * previous authentication
 */
export const retrieveUserFromCache: () => string | null = () => {
    const token = localStorage.getItem("user");
    if(!token) {
        return null;
    }
    return token;
}

/**
 * Responsible for updating the user cache with
 * the most updated encoded JWT token for to allow
 * persisting later auth states
 */
export const setUserInCache: (token: string) => void = (token) => {
    localStorage.setItem("user", JSON.stringify(token));
}


/**
 * Responsible for deleting user auth token
 * from browser cache, in case user signs out
 */
export const deleteUser = () => {
    localStorage.removeItem("user");
}

export const authFetch = async(url: string, options: RequestInit) => {
    const token = retrieveUserFromCache();
    if(token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`
        };
    }

    try {
        const response = await fetch(url, options);
        return response;
    } catch(error) {
        throw(error);
    }
}