import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"
import Link from "next/link"
import { addLikeToBlog } from "@/app/actions/blogs"
import Button from "@/app/components/Button"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const blog = await getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
            <p className="italic text-gray-500">by {blog.author}</p>
            <Link
                href={blog.url}
                className="hover:text-blue-500 hover:underline"
            >
                Link to blog
            </Link>
            <p>Likes: {blog.likes}</p>
            <form action={addLikeToBlog}>
                <input type="hidden" name="id" value={blog.id} />
                <Button type="submit" className="mt-4">Like this blog</Button>
            </form>
        </div>
    )
}

export default BlogPage