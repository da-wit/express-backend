import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LogInDto {
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password
    }
}