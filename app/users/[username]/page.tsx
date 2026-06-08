import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithNotes } from "@/app/services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params
    const user = await getUserWithNotes(username)

    if (!user) {
        notFound()
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <p>Username: {user.username}</p>
            <h3>Blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>
                        <p><Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}</p>
                        <Link href={blog.url}>Link to blog</Link>
                        <p>Likes: {blog.likes}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserPage