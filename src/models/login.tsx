import { User } from "firebase/auth";
import { JwtPayload } from "jwt-decode";

type Role = "counselor" | "recruiter" | "student";

interface LoginContextData {
    authUser: User | null,
    populated: boolean
    role: Role,
    name: string,
    populateUser: (user: User) => void
}

interface UserJWT extends JwtPayload {
    account_type: Role,
    dis: string | null,
}

export type { LoginContextData, Role, UserJWT };