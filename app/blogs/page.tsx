import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = () => {
    const blogs = getBlogs()
    return (
        <div>
            <h2>Blogs</h2>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <p>{blog.title} by {blog.author}</p>
                        <Link href={blog.url}>Link to blog</Link>
                        <p>Likes: {blog.likes}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Blogs