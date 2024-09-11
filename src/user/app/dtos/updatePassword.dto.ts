import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    oldPassword: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    newPassword: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    confirmPassword: string

    constructor(oldPassword: string, newPassword: string, confirmPassword: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
}