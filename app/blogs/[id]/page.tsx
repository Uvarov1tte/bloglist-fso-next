import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import Link from "next/link"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const blog = getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>by {blog.author}</p>
            <li key={blog.id}>
                <Link href={blog.url}>Link to blog</Link>
                <p>Likes: {blog.likes}</p>
            </li>
        </div>
    )
}

export default BlogPage