"use client";

import Link from "next/link";
import Button from "./button";
import { useLoginContext, useLogout } from "@/services/login.service";
import Error from "./Error";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

export default function Navbar() {
    const { authUser, role } = useLoginContext();
    const [loading, error, resetError, logOut] = useLogout();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <>
            <nav className="relative py-[20px] px-[20px] md:px-[60px] justify-between items-center hidden md:flex">
                <Link href="/">
                    <h4>Guild</h4>
                </Link>
                <div className="absolute left-[50%] translate-x-[-50%] flex items-center gap-[32px]">
                    <Button variant="text"><Link href="/jobs">Jobs</Link></Button>
                    {authUser &&
                        <Button variant="text"><Link href={`/dashboard/${role}`}>Dashboard</Link></Button>
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
            <nav className="relative py-[20px] px-[20px] md:px-[60px] justify-between items-center flex md:hidden">
                <Link href="/">
                    <h4>Guild</h4>
                </Link>
                <Button onClick={() => setShowMenu(!showMenu)} size='small'>
                    {showMenu ? <X size={24} /> : <List size={24} />}
                </Button>
            </nav>
            {showMenu && <div className="fixed w-full mt-[-15px] flex flex-col items-end md:hidden gap-[8px] mb-[20px] px-[20px] z-[100]">
                <div className="flex flex-col gap-[8px] items-end bg-white-100 p-[16px] rounded-[10px]">
                    <Button variant="text"><Link href="/jobs">Jobs</Link></Button>
                    {authUser &&
                        <Button variant="text"><Link href={`/dashboard/${role}`}>Dashboard</Link></Button>
                    }
                    <Button variant="text"><Link href="/about">About</Link></Button>
                    {authUser ?
                        <Button variant="text" onClick={logOut} loading={loading}>Log Out</Button>
                        :
                        <Link href="/login">
                            <Button variant='text'>Login</Button>
                        </Link>
                    }
                </div>
            </div>}
        </>
    )
}