export interface UserPayload {
    sub: number;
    email: string;
    type: 'user' | 'professional';
}
