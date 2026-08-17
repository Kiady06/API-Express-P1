import UserComponent from "./UserComponent";
import type { User } from "./api/userApi";

export function UsersList({ users }: { users: User[] }) {
  return users.map((user: User) => (
    <UserComponent key={user.id} user={user} />
  ));
}

export default UsersList;