import { useUsersList } from "./api/userApi";
import { UsersList } from "./UsersList";
import CreateUserForm from "./CreateUserForm";
import type { User } from "./api/userApi";

function App() {
  const [users, setUsers] = useUsersList();

  function handleUserCreated(newUser: User) {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  }

  return (
    <div>
      <h1>Gestion des users</h1>
      <CreateUserForm onUserCreated={handleUserCreated} />
      <UsersList users={users} />
    </div>
  );
}

export default App;