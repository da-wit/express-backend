import { IsNotEmpty, isString, IsString, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    public oldPassword: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    public newPassword: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    public confirmPassword: string;

    constructor(oldPassword: string, newPassword: string, confirmPassword: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
}