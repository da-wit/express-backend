import { User } from "../../domain/entities/user";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";
import { CreateUserDto } from "../dtos/createUser.dto";
import { UpdateEmailDto } from "../dtos/updateEmail.dto";
import { UpdatePasswordDto } from "../dtos/updatePassword.dto";
import { UpdateUserNameDto } from "../dtos/updateUserName.dto";

export interface IUserService {
    crateUser(userData: CreateUserDto): Promise<IUserDocument>;
    getUsers(): Promise<IUserDocument[]>
    updateUserName(newUserName: UpdateUserNameDto, userId: string): Promise<IUserDocument>;
    updateEmail(newEmail: UpdateEmailDto, userId: string): Promise<IUserDocument>;
    updatePassword(newPassword: UpdatePasswordDto, userId: string): Promise<IUserDocument>
}