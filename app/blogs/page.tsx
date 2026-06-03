import Link from "next/link"

const blogs = [
    {
        id: 1,
        title: "Lorem Ipsum",
        author: 'John Doe',
        url: 'localhost:99999/01',
        likes: 1
    },
    {
        id: 2,
        title: "Lorem Ipsum",
        author: 'Jane Doe',
        url: 'localhost:99999/02',
        likes: 3
    },
]

const Blogs = () => {
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