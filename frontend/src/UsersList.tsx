import { useUsersList, type User } from "./api/userApi";
import UserComponent from "./UserComponent";

export function UsersList() {
    const users = useUsersList();
    return (users.map( (user: User) => 
        <UserComponent  key={user.id} user={user} />
    ))
}

export default UsersList;