import { IsEmail, isNotEmpty, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @MinLength(8)
    public password: string;
}


export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @MinLength(8)
    public password: string;
}
