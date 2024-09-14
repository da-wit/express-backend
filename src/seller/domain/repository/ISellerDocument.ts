import { Document } from "mongoose";
import { Role } from "../../../common/Roles/Role";

export interface ISellerDocument extends Document {
    companyname: string;
    username: string;
    email: string;
    password: string,
    role: Role;
};