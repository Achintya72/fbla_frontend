"use client";

import Link from "next/link";
import Button from "./button";
import { useLoginContext, useLogout } from "@/services/login";
import Error from "./Error";

export default function Navbar() {
    const { authUser } = useLoginContext();
    const [loading, error, resetError, logOut] = useLogout();

    return (
        <>
            <nav className="relative py-[20px] px-[60px] flex justify-between items-center">
                <Link href="/">
                    <h4>Guild</h4>
                </Link>
                <div className="absolute left-[50%] translate-x-[-50%] flex items-center gap-[32px]">
                    <Button variant="text"><Link href="/jobs">Jobs</Link></Button>
                    {authUser &&
                        <Button variant="text"><Link href="/dashboard">Dashboard</Link></Button>
                    }
                    <Button variant="text"><Link href="/about">About</Link></Button>
                </div>
                {authUser ?
                    <Button onClick={logOut} loading={loading}>Log Out</Button>
                    :
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                }
            </nav>
            <Error error={error} resetError={resetError} />
        </>
    )
}