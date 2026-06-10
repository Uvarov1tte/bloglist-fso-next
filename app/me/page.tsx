import { notFound } from "next/navigation"
import { getCurrentUser } from "@/app//services/session"

const MePage = async () => {
    const user = await getCurrentUser()
    if (!user) {
        notFound()
    } else {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6">My profile</h2>
                <p className="my-2"><span className="font-bold">Name</span>: {user.name}</p>
                <p className="my-2 mb-6"><span className="font-bold">Username</span>: {user.username}</p>
                <hr />
                <h2 className="text-2xl font-bold my-6">API Token</h2>
            </div>
        )
    }
}

export default MePage