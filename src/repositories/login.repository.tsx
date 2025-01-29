import { Role } from "@/models/login";

// Methods responsible for engaging with API to authenticate user

/**
 * Responsible for logging in user with email and password
 * @returns 
 * JWT Token if sign in was successful
 * Null if the sign in was not successful
 */
export const loginUser: (email: string, password: string) => Promise<string> = async (email, password) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign_in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password: password }),
        });

		const token = await response.text();
        return token;

    } catch (e) {
        throw(e);
    }
}


/**
 * Responsible for attempting to create a new user
 * with email and password
 * @returns 
 * Success: JWT Token
 * Failure: null
 */
export const createUser: (email: string, password: string, name: string, role: Role) => Promise<string> = async (name, email, password, role) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign_up`, {
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body: JSON.stringify({
                name,
                account_type: role,
                credentials: {
                    username: email,
                    password: password
                }
            })
        });

        const token = await response.text();
        return token;
    } catch(e) {
        throw(e);
    }
}

/**
 * Used to sign in user with credentials, for
 * auth persistence
 * @returns whether or not the jwt is valid
 */
export const validateJWT: (token: string) => Promise<boolean> = async (token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jwt_check`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
        return true;
    } catch(e) {
        return false;
    }
}