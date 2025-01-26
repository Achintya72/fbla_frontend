import { User } from "firebase/auth";

type Role = "counselor" | "recruiter" | "student";

interface LoginContextData {
    authUser: User | null,
    populated: boolean
    role: Role,
    name: string,
    populateUser: (user: User) => void
}

export type { LoginContextData, Role };