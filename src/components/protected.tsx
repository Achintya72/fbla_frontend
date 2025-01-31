"use client";

import { Role } from "@/models/login";
import { useLoginContext } from "@/services/login.service";
import { redirect } from "next/navigation";
import { ComponentType, useLayoutEffect } from "react";

interface ProtectionOptions {
    auth: boolean;
    role?: Role[]
}

const verifyAuth = (authUser: boolean, role: Role, options: ProtectionOptions) => {
    if (options.auth && !authUser) {
        return redirect("/login");
    } else if (options.role && !options.role.includes(role)) {
        return authUser ? redirect(`/dashboard/${options.role}`) : redirect("/login");
    }
    return null;
}

export default function withProtection<P extends object>(Component: ComponentType<P>, options: ProtectionOptions) {
    return function WithProtection(props: P) {
        const { authUser, role } = useLoginContext();

        useLayoutEffect(() => {
            const action = verifyAuth(authUser, role, options);
            if (action != null) {
                return action;
            }
        }, [authUser, role]);

        if (verifyAuth(authUser, role, options) != null) {
            return null;
        }

        return <Component {...props} />
    }

}