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

}
