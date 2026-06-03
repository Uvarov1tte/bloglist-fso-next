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
let nextId = 3

export const getBlogs = () => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
    return sorted
}

export const addBlogs = (title: string, author: string, url: string) => {
    blogs.push({ id: nextId++, title, author, url, likes: 0 })
}

export const getBlogById = (id: number) => {
    return blogs.find((blog) => blog.id === id)
}

export const addLike = (id: number) => {
    const blog = blogs.find((blog) => blog.id === id)
    if (blog) {
        blog.likes++
    }
}