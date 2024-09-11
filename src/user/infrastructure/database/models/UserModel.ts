import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import { IUserModel } from "./IUserModel";
import { Role } from "../../../../common/Roles/Role";

export interface IUserDocument extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
    role: Role;
}

const userSchema = new mongoose.Schema<IUserDocument>({
    username: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: Object.values(Role), default: Role.USER }
})


const UserModel = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export default UserModel;