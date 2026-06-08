"use client"

import { registerUser } from "../actions/users"
import { useActionState, useEffect } from "react"
import { useNotification } from "../components/NotificationContext"
import { useRouter } from "next/navigation"

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
        <div>
            <h2>Register</h2>
            <form action={formAction}>
                <div>
                    <label>
                        Username
                        <input
                            type="text"
                            name="username"
                            required
                            defaultValue={state.values?.username}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            required
                            defaultValue={state.values?.name}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            required
                            defaultValue={state.values?.password}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password Confirmation
                        <input
                            type="password"
                            name="passwordConfirm"
                            required
                            defaultValue={state.values?.passwordConfirm}
                        />
                    </label>
                </div>
                <button type="submit">Register</button>
                {state.errors && Object.keys(state.errors).length > 0 && Object.values(state.errors).map((e: any, idx) => <p key={idx} style={{ color: "red" }}>{e.toString()}</p>)}
            </form>
        </div>
    )
}