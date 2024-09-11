import { IEncryptionService } from "../../../common/auth/domain/service/IEncryptionService";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";
import { CreateUserCommand } from "../commands/createUserCommand";
import { UpdatePasswordCommand } from "../commands/updatePasswordCommand";
import { UpdateUserEmailCommand } from "../commands/updateUserEmail";
import { UpdateUserCommand } from "../commands/updateUserNameCommand";
import { CreateUserDto } from "../dtos/createUser.dto";
import { UpdateEmailDto } from "../dtos/updateEmail.dto";
import { UpdatePasswordDto } from "../dtos/updatePassword.dto";
import { UpdateUserNameDto } from "../dtos/updateUserName.dto";
import { IUserService } from "../interfaces/IUserService";
import { GetUsersQuery } from "../queries/getUsersQuery";

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository, private encryption: IEncryptionService) { }

    async crateUser(userData: CreateUserDto): Promise<IUserDocument> {
        console.log(userData, "userService")
        const command = new CreateUserCommand(this.userRepository, userData, this.encryption);
        return await command.execute();
    }
    async getUsers(): Promise<IUserDocument[]> {
        const query = new GetUsersQuery(this.userRepository);
        return await query.excute();
    }

    async updateUserName(newUserName: UpdateUserNameDto, userId: string): Promise<IUserDocument> {
        const command = new UpdateUserCommand(this.userRepository, newUserName, userId);
        return command.execute()
    }
    async updateEmail(newEmail: UpdateEmailDto, userId: string): Promise<IUserDocument> {
        const command = new UpdateUserEmailCommand(this.userRepository, newEmail, userId);

        return await command.execute();
    }

    async updatePassword(newPassword: UpdatePasswordDto, userId: string): Promise<IUserDocument> {
        const command = new UpdatePasswordCommand(this.userRepository, this.encryption, newPassword, userId);

        return command.execute();
    }

}