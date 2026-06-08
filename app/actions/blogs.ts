"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { addBlogs, addLike } from "../services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (
    prevState: { error: string },
    formData: FormData
) => {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }
    const title = formData.get("title") as string
    if (!title || title.length < 10) {
        return { error: "Title must be at least 5 characters long" }
    }

    const author = formData.get("author") as string
    if (!author || author.length < 10) {
        return { error: "Author must be at least 5 characters long" }
    }

    const url = formData.get("url") as string
    if (!url || url.length < 10) {
        return { error: "URL must be at least 5 characters long" }
    }

    await addBlogs(title, author, url)

    revalidatePath("/blogs")
    redirect("/blogs")
}

export const addLikeToBlog = async (formData: FormData) => {
    const id = Number(formData.get("id"))
    await addLike(id)
    revalidatePath(`/blogs/${id}`)
    revalidatePath("/blogs")
}

export const searchWithFilter = async (formData: FormData) => {
    const filter = formData.get("filter") as string
    redirect(`/blogs?filter=${filter}`)
}