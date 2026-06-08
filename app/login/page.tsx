"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"

export default function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const result = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        })

        if (result?.error) {
            setError("Invalid username or password")
        } else {
            router.push("/")
            router.refresh()
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-1/4">Username</td>
                            <td><Input
                                type="text"
                                name="username"
                                required
                                className="w-full"
                            /></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <Input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit" className="mt-4">Log in</Button>
            </form>
        </div>
    )
}