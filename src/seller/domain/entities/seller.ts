import { Role } from "../../../common/Roles/Role";

export class Seller {
    private id!: string;
    private companyname: string;
    private username: string;
    private email: string;
    private password: string;
    private role: Role = Role.SELLER;

    constructor(companyname: string, username: string, email: string, password: string) {
        this.companyname = companyname;
        this.username = username;
        this.email = email;
        this.password = password
    }

}