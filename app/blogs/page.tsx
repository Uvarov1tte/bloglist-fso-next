import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { searchWithFilter } from "../actions/blogs"

const Blogs = async ({
    searchParams,
}: {
    searchParams: Promise<{ filter?: string }>
    }) => {
    const { filter } = await searchParams
    const allBlogs = getBlogs()
    const blogs = filter
        ? allBlogs.filter((note) => note.title.toLowerCase().includes(filter.toLowerCase()))
        : allBlogs
    return (
        <div>
            <h2>Blogs</h2>
            <div>
                <form action={searchWithFilter}>
                    <input type="text" name="filter" />
                    <button type="submit">Search with filter</button>
                </form>
            </div>
            <ul>
                {blogs.map(blog => (
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
export default Blogs