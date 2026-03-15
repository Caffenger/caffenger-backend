export interface JwtPayload {
    sub: string;    //userId
    email: string;
    name: string;
}

export interface MePayload {
    email: string;
    name: string;
    createdAt: Date;
}