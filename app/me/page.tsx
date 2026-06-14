import { notFound } from "next/navigation"
import { getCurrentUser } from "@/app//services/session"
import Button from "../components/Button"
import { generateNewToken } from "../actions/users"
import Link from "next/link"

const MePage = async () => {
    const user = await getCurrentUser()
    console.log(user)
    if (!user) {
        notFound()
    } else {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6">My profile</h2>
                <p className="my-2"><span className="font-bold">Name</span>: {user.name}</p>
                <p className="my-2 mb-6"><span className="font-bold">Username</span>: {user.username}</p>
                <hr />
                <h2 className="text-2xl font-bold my-6">Reading list</h2>
                <ul>
                    {user.reading_list.map(item => (
                        <li key={item.id} className="border rounded p-3 hover:bg-gray-50 hover:text-gray-900">
                            <Link
                                href={`/blogs/${item.blogId}`}
                                className="hover:text-blue-500 hover:underline">
                                {item.blog.title}
                            </Link>
                            {item.read? <p>Read</p>: <p>Not read</p>}
                        </li>
                    ))}
                </ul>
                <hr />
                <h2 className="text-2xl font-bold my-6">API Token</h2>
                <div className="border p-4 mx-auto">
                    {user.token ? (
                        <>
                            <p>Current token:</p>
                            <div className="border p-2 my-2 border-gray-500">{user.token}</div>
                        </>
                    ) :
                        <p>No token has been generated yet.</p>
                    }
                </div>

                <form action={generateNewToken}>
                    <input type="hidden" name="id" value={user.id} />
                    <Button type="submit" className="mt-6">Generate new token</Button>
                </form>
            </div>
        )
    }
}

export default MePage