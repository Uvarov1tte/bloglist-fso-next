"use server"

import { addToReadingList } from "../services/readingList"
import { revalidatePath } from "next/cache"

export const submitReadingList = async (formData: FormData) => {
    const userId = Number(formData.get("userId"))
    const blogId = Number(formData.get("blogId"))

    await addToReadingList(userId, blogId)
    revalidatePath(`/blogs/${blogId}`)
}