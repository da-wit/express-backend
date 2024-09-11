import { IUserDocument } from "../../infrastructure/database/models/UserModel";
import { User } from "../entities/user";

export interface IUserRepository {
    findById(id: string): Promise<IUserDocument | null>;
    findByUserName(userName: string): Promise<IUserDocument | null>;
    findByEmail(email: string): Promise<IUserDocument | null>;
    findAll(): Promise<IUserDocument[]>;
    save(user: User): Promise<IUserDocument>;
    update(user: IUserDocument): Promise<IUserDocument>
    delete(id: string): Promise<boolean>;
}