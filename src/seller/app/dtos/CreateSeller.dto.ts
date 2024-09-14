import { IsNotEmpty, isString, IsString, MinLength } from "class-validator";

export class CreateSellerDto {
    @IsString()
    @IsNotEmpty()
    public companyname: string;
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

    constructor(companyname: string, username: string, email: string, password: string) {
        this.companyname = companyname;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}