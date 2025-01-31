import { JwtPayload } from "jwt-decode";

type Role = "counselor" | "recruiter" | "student";

interface LoginContextData {
    authUser: boolean,
    populated: boolean
    role: Role,
    name: string,
    populateUser: (token: string) => void,
    reset: () => void,
}

interface UserJWT extends JwtPayload {
    rol: Role,
    dis: string | null,
}

export type { LoginContextData, Role, UserJWT };