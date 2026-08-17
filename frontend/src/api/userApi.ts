import { useEffect, useState } from "react";

export interface User {
    id:number,
    name:string,
    email:string
}

export function useUsersList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response:Response = await fetch('/users');
                if (!response.ok) {
                    throw new Error(`HTTP error ! Statut : ${response.status}`);
                }
                const datas:User[] = await response.json();

                setUsers(datas);

            } catch (e) {
                console.log(`Error: ${e}`);
            } 
        }

        fetchUsers();
    }, [])

    return [users, setUsers] as const;
}

export async function createUser(user: Omit<User, 'id'>): Promise<User | null> {
    try {
        const response:Response = await fetch('/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        if (!response.ok) {
                    throw new Error(`HTTP error ! Statut : ${response.status}`);
        }
        return await response.json();

    }  catch (e) {
                console.log(`Error: ${e}`);
                return null;
            } 
}