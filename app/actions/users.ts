"use server"

import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const registerUser = async (
    prevState: { errors: Object, values: Object, success: boolean },
    formData: FormData
) => {
    let errors = {}
    const username = (formData.get("username") as string).trim()
    if (!username || username.length < 4) {
        errors = { ...errors, username: "Username must be at least 4 characters long" }
    }
    const existed = await db.query.users.findFirst({
            where: eq(users.username, username),
    })
    if (existed) {
        errors = { ...errors, notUnique: "Username must be unique"}
    }

    const name = (formData.get("name") as string).trim()

    const password = formData.get("password") as string
    if (!password || password.length < 4) {
        errors = { ...errors, password: "Password must be at least 4 characters long" }
    }

    const passwordConfirm = formData.get("passwordConfirm") as string
    if (passwordConfirm !== password) {
        errors = { ...errors, passwordConfirm: "Password does not match" }
    }

    if (Object.keys(errors).length > 0) {
        return { errors, values: { username, name, password, passwordConfirm }, success: false }
    }


    const passwordHash = await bcrypt.hash(password, 10)

    await db.insert(users).values({ username, name, passwordHash })
    return { errors: {}, values: {}, success: true }
}