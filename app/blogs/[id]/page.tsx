import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"
import Link from "next/link"
import { addLikeToBlog } from "@/app/actions/blogs"
import Button from "@/app/components/Button"
import { getCurrentUser } from "@/app/services/session"
import { ifReadingListExisted } from "@/app/services/readingList"
import { submitReadingList } from "@/app/actions/readingList"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const blog = await getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    const user = await getCurrentUser()

    const existed = user ? await ifReadingListExisted(user.id, blog.id) : false

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
                <Button type="submit" className="mt-4">like</Button>
            </form>


            {user && !existed && (
                <form action={submitReadingList}>
                    <input type="hidden" name="userId" value={user.id} />
                    <input type="hidden" name="blogId" value={blog.id} />
                    <Button type="submit" className="mt-4">add to reading list</Button>
                </form>
            )}
        </div>
    )
}

export default BlogPage