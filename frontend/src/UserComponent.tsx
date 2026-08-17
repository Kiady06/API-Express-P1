import type { User } from "./api/userApi"

function UserComponent({ user } : { user: User }) {
    return (
        <div>
            <h2>{user.id}</h2>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    )
}

export default UserComponent;