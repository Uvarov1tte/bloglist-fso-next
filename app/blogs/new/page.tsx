"use client"

import { createBlog } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"
import Button from "@/app/components/Button"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import Input from "@/app/components/Input"

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
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
            <form action={formAction}>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-1/4">Title</td>
                            <td><Input
                                type="text"
                                name="title"
                                required
                                defaultValue={state.values?.title}
                                className="w-full"
                            /></td>
                        </tr>
                        <tr>
                            <td>Author</td>
                            <td>
                                <Input
                                    type="text"
                                    name="author"
                                    required
                                    defaultValue={state.values?.author}
                                    className="w-full"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td >URL</td>
                            <td>
                                <Input
                                    type="text"
                                    name="url"
                                    required
                                    defaultValue={state.values?.url}
                                    className="w-full"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Button type="submit" className="mt-4">Create new blog</Button>
                {state.errors && Object.keys(state.errors).length > 0 && Object.values(state.errors).map((e: any, idx) => <p key={idx} style={{ color: "red" }}>{e.toString()}</p>)}
            </form>
        </div>
    )
}

export default newBlog