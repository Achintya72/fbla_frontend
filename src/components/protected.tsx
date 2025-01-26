"use client";

import { Role } from "@/models/login";
import { useLoginContext } from "@/services/login";
import { User } from "firebase/auth";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

interface ProtectionOptions {
    auth: boolean;
    role?: Role[]
}

const verifyAuth = (authUser: User | null, role: Role, options: ProtectionOptions) => {
    if(options.auth && !authUser) {
        return redirect("/login");
    } else if(options.role && !options.role.includes(role)) {
        return authUser ? redirect("/dashboard") : redirect("/login");
    }
    return null;
}

export default function withProtection(Component: any, options: ProtectionOptions) {
    return function WithProtection(props: any) {
        const { authUser, role } = useLoginContext();
        


        useLayoutEffect(() => {
            const action = verifyAuth(authUser, role, options);
            if(action != null) {
                return action;
            }
        }, [verifyAuth, options, authUser, role]);

        if(verifyAuth(authUser, role, options) != null) {
            return null;
        }

        return <Component {...props} />
    }

}