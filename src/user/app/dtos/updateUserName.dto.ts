import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserNameDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    constructor(username: string) {
        this.username = username;
    }
}