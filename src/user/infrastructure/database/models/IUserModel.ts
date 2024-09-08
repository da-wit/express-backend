import { Model } from "mongoose";
import { UserDocument } from "./UserModel";

export interface IUserModel extends Model<UserDocument> { };