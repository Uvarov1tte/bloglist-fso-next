"use client"

import { registerUser } from "../actions/users"
import { useActionState, useEffect } from "react"
import { useNotification } from "../components/NotificationContext"
import { useRouter } from "next/navigation"
import Button from "../components/Button"
import Input from "../components/Input"

export default function RegisterPage() {
    const [state, formAction] = useActionState(registerUser, { errors: {}, values: { username: "", name: "", password: "", passwordConfirm: "" }, success: false })
    const { showNotification } = useNotification()
    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            showNotification("New user registered successfully, please log in.")
            router.push("/login")
        }
    }, [state, showNotification, router])
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form action={formAction}>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-1/4">Username</td>
                            <td><Input
                                type="text"
                                name="username"
                                required
                                defaultValue={state.values?.username}
                                className="w-full"
                            /></td>
                        </tr>
                        <tr>
                            <td className="w-1/4">Name</td>
                            <td><Input
                                type="text"
                                name="name"
                                required
                                defaultValue={state.values?.name}
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
                                    defaultValue={state.values?.password}
                                    className="w-full"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Confirm Password</td>
                            <td>
                                <Input
                                    type="password"
                                    name="passwordConfirm"
                                    required
                                    defaultValue={state.values?.passwordConfirm}
                                    className="w-full"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Button type="submit" className="mt-4">Register</Button>
                {state.errors && Object.keys(state.errors).length > 0 && Object.values(state.errors).map((e: any, idx) => <p key={idx} style={{ color: "red" }}>{e.toString()}</p>)}
            </form>
        </div>
    )
}