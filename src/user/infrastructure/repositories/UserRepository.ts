import { User } from "../../domain/entities/user";
import { UserError } from "../../domain/error/userError";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUserModel } from "../database/models/IUserModel";
import UserModel from "../database/models/UserModel";
import { EncryptionService } from "../services/encryptionservice";

export class UserRepository implements IUserRepository {

    constructor(private userModel: IUserModel) {

    }

    async save(user: User): Promise<User> {
        console.log(user, "kddkkd")
        const newUser = new this.userModel(user);
        await newUser.save();
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            return null;
        };
        return new User(user.username, user.email, user.password);
    }

    async findByUserName(userName: string): Promise<User | null> {
        const user = await this.userModel.findOne({ username: userName });
        if (!user) {
            return null;
        }
        return new User(user.username, user.email, user.password);
    }

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find();
        return users.map((user) => new User(user.username, user.email, user.password));
    }

    async delete(id: string): Promise<boolean> {
        const user = await this.findById(id);
        if (!user) {
            throw UserError.UserNotFound();
        }
        const result = await this.userModel.deleteOne({ _id: id });
        return result.deletedCount === 1;
    }
}