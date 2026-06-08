"use client"

import { createBlog } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"

const newBlog = () => {
    const [state, formAction] = useActionState(createBlog, { errors: {}, values: { title: "", author: "", url: "" }, success: false })
    const { showNotification } = useNotification()
    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            showNotification("Blog created")
            router.push("/blogs")
        }
    }, [state, showNotification, router])

    return (
        <div>
            <h2>Create a new blog</h2>
            <form action={formAction}>
                <div>
                    <label>
                        Title
                        <input
                            type="text"
                            name="title"
                            required
                            defaultValue={state.values?.title}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Author
                        <input
                            type="text"
                            name="author"
                            required
                            defaultValue={state.values?.author}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        URL
                        <input
                            type="text"
                            name="url"
                            required
                            defaultValue={state.values?.url}
                        />
                    </label>
                </div>
                <button type="submit">Create</button>
                {state.errors && Object.keys(state.errors).length > 0 && Object.values(state.errors).map((e: any, idx) => <p key={idx} style={{ color: "red" }}>{e.toString()}</p>)}
            </form>
        </div>
    )
}

export default newBlog