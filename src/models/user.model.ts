export interface CreateUser {
    name: string;
    email: string;
}

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string
    ) {}
}