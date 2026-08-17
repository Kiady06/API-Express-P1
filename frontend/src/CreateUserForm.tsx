import { useState } from "react";
import { createUser } from "./api/userApi";
import type { User } from "./api/userApi";

interface CreateUserFormProps {
  onUserCreated: (user: User) => void;
}

function CreateUserForm({ onUserCreated }: CreateUserFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = await createUser({ name, email });
    if (user) {
      onUserCreated(user);
      setName("");
      setEmail("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" name="email" id="email" placeholder="johndoe@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateUserForm;