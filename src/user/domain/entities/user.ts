import { Role } from "../../../common/Roles/Role";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";
export class User {
    private id!: string;
    private username: string;
    private email: string;
    private password: string;
    private role: Role = Role.USER;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static fromIDocumentToUser(user: IUserDocument): User {
        return new User(user.username, user.email, user.password)
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

    getRole(): Role {
        return this.role;
    }

    // changeUserName(oldUserName: string, newUserName: string) {
    //     if (oldUserName !== newUserName) {
    //         throw UserError.userNameMismatch();
    //     }
    //     this.username = newUserName;
    // }

    // changeEmail(oldEmail: string, newEmail: string) {
    //     if (oldEmail !== newEmail) {
    //         throw UserError.EmailMismatch();
    //     }
    //     this.email = newEmail;
    // }

    // changePassword(newPassword: string) {
    //     this.password = newPassword;
    // }

}
