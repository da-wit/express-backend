import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import { IUserModel } from "./IUserModel";

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 }
})


const UserModel = mongoose.model<UserDocument, IUserModel>('User', userSchema);

export default UserModel;