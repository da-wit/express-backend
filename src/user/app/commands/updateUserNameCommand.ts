import { User } from "../../domain/entities/user";
import { UserError } from "../../domain/error/userError";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";
import { UpdateUserNameDto } from "../dtos/updateUserName.dto";

export class UpdateUserCommand {
    constructor(private userRepository: IUserRepository, private newUserName: UpdateUserNameDto, private userId: string) {
    }

    async execute(): Promise<IUserDocument> {
        const { username } = this.newUserName;
        const user = await this.userRepository.findById(this.userId);
        if (!user) throw UserError.UserNotFound();
        const isUserNameTaken = await this.userRepository.findByUserName(username);
        if (isUserNameTaken) throw UserError.UserNameAlreadyExists();

        user.username = this.newUserName.username


        const updatedUser = this.userRepository.update(user);

        return updatedUser;
    }
}