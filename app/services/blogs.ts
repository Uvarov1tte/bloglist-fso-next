import { desc, eq, ilike } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"


let nextId = 3

export const getBlogs = async (filter?: string) => {
    const filterString = filter ? filter : ""
    const allBlogs = await db.select()
        .from(blogs)
        .orderBy(desc(blogs.likes))
        .where(ilike(blogs.title, `%${filterString}%`))
    return allBlogs
}

export const addBlogs = async (title: string, author: string, url: string) => {
    await db.insert(blogs).values({ title, author, url, })
}

export const getBlogById = async (id: number) => {
    return db.query.blogs.findFirst({
        where: eq(blogs.id, id),
    })
}

export const addLike = async (id: number) => {
    const blog = await getBlogById(id)
    if (blog) {
        await db
            .update(blogs)
            .set({ likes: blog.likes + 1 })
            .where(eq(blogs.id, id))
    }
}