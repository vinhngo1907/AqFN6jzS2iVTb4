import { ApiProperty } from "@nestjsx/crud/lib/crud";

export class RegisterPayload {
    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    password: string;    
}

export class LoginPayload {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}

export enum Role {
    User = 'USER',
    Admin = "ADMIN",
    Supporter = "SUPPORTER",
    Mod = "MOD"
}

export interface TokenPayload {
    username: string;
    userId: string;
}