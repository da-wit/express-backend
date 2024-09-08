import { EncryptionService } from "../../infrastructure/services/encryptionservice";
import { UserError } from "../error/userError";

export class User {
    private id!: string;
    private username: string;
    private email: string;
    private password: string;
    private encryptionService: EncryptionService;

    constructor(username: string, email: string, password: string, encryptionService: EncryptionService) {
        this.encryptionService = encryptionService;
        this.username = username;
        this.email = email;
        this.password = this.encryptionService.hashPassword(password);
    }

    getUserId(): string {
        return this.id;
    }

    getUserName(): string {
        return this.username;
    }

    getUserEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    changeUserName(oldUserName: string, newUserName: string) {
        if (oldUserName !== newUserName) {
            throw UserError.userNameMismatch();
        }
        this.username = newUserName;
    }

    changeEmail(oldEmail: string, newEmail: string) {
        if (oldEmail !== newEmail) {
            throw UserError.EmailMismatch();
        }
        this.email = newEmail;
    }

    changePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
        if (!this.encryptionService.validatePassword(oldPassword, this.password)) {
            throw UserError.OldPasswordIsInCorrect();
        }
        if (newPassword !== confirmPassword) {
            throw UserError.PasswordMismatch();
        }
        this.password = this.encryptionService.hashPassword(newPassword);
    }

}
