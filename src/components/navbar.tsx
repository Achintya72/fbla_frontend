import Link from "next/link";
import Button from "./button";

export default function Navbar() {
    return (
        <nav className="relative py-[20px] px-[60px] flex justify-between items-center">
            <Link href="/">
                <h4>Guild</h4>
            </Link>
            <div className="absolute left-[50%] translate-x-[-50%] flex items-center gap-[32px]">
                <Button variant="text"><Link href="/about">Dashboard</Link></Button>
                <Button variant="text"><Link href="/about">About</Link></Button>
            </div>
            <Link href="/login">
                <Button>Login</Button>
            </Link>
        </nav>
    )
}