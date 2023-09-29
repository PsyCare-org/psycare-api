export interface UserFromJwt {
    id: number;
    email: string;
    type: 'user' | 'professional';
}
