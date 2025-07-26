import { IsEmail, IsString, IsStrongPassword, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    name: string;


    @IsStrongPassword()
    password: string;
}
