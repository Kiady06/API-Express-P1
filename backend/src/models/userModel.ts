export type Role = "admin" | "user";

export interface CreateUser {
    name: string;
    email: string;
    password: string;
    role?: Role;
}

// Utilisateur complet tel que stocké en base (contient le hash du mot de passe)
export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public role: Role
    ) {}
}

// Utilisateur "public" : jamais renvoyer le password dans une réponse HTTP
export class PublicUser {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public role: Role
    ) {}

    static fromUser(user: User): PublicUser {
        return new PublicUser(user.id, user.name, user.email, user.role);
    }
}
