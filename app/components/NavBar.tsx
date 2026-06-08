"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
    const { data: session } = useSession()

    return (
        <nav>
            <Link href="/">home</Link>
            {" | "}
            <Link href="/blogs">blogs</Link>
            {" | "}
            {session ? (
                <>
                    <Link href="/blogs/new">Create new blog</Link>
                    {" | "}
                    <em>{session.user?.name} logged in</em>{" "}
                    <button onClick={() => signOut()}>logout</button>
                </>
            ) : (
                <>
                    <Link href="/login">login</Link>
                    {" | "}
                    <Link href="/register">register</Link>
                </>
            )}
            {" | "}
            <Link href="/users">All users</Link>
        </nav >
    )
}