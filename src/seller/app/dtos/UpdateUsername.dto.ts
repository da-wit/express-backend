import { IsNotEmpty, isString, IsString, MinLength } from "class-validator";

export class UpdateUsernameDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    public username: string;


    constructor(username: string) {

        this.username = username;

    }
}