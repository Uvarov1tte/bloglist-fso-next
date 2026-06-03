"use server"

import { redirect } from "next/navigation"
import { addBlogs, addLike } from "../services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (formData: FormData) => {
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const url = formData.get("url") as string
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