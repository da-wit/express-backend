import { Model } from "mongoose";
import { IUserDocument } from "./UserModel";

export interface IUserModel extends Model<IUserDocument> { };