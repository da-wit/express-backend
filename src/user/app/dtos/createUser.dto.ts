import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    public username: string;

    @IsString()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    public password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email
        this.password = password;
    }

}