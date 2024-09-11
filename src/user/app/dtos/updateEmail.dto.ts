import { IsNotEmpty, IsString } from "class-validator";

export class UpdateEmailDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    constructor(email: string) {
        this.email = email
    }
}