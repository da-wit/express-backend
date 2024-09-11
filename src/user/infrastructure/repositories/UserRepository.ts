import { User } from "../../domain/entities/user";
import { UserError } from "../../domain/error/userError";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUserModel } from "../database/models/IUserModel";
import UserModel, { IUserDocument } from "../database/models/UserModel";

export class UserRepository implements IUserRepository {

    constructor(private userModel: IUserModel) {

    }

    async save(user: User): Promise<IUserDocument> {
        console.log(user, "save")
        const userDocument = new this.userModel({
            username: user.getUserName(),
            email: user.getUserEmail(),
            password: user.getPassword(),
        });
        await userDocument.save();
        return userDocument;
    }
    async update(user: IUserDocument): Promise<IUserDocument> {
        const existingUser = await this.userModel.findByIdAndUpdate(user.id, user, { new: true })
        if (!existingUser) {
            throw UserError.UserNotFound();
        }
        // existingUser = user;
        // existingUser.save();
        return existingUser;

    }

    async findById(id: string): Promise<IUserDocument | null> {
        const user = await this.userModel.findById(id);
        if (!user) {
            return null;
        };
        return user;
    }

    async findByUserName(userName: string): Promise<IUserDocument | null> {
        const user = await this.userModel.findOne({ username: userName });
        if (!user) {
            return null;
        }
        // return new User(user.username, user.email, user.password);
        return user;
    }

    async findByEmail(email: string): Promise<IUserDocument | null> {
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            return null;
        }
        return user;
    }

    async findAll(): Promise<IUserDocument[]> {
        const users = await this.userModel.find();
        // return users.map((user) => new User(user.username, user.email, user.password));
        return users;
    }

    async delete(id: string): Promise<boolean> {
        const user = await this.findById(id);
        if (!user) {
            throw UserError.UserNotFound();
        }
        await this.userModel.findByIdAndDelete({ _id: id });
        return true;
    }
}