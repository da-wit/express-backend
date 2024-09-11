import { User } from "../../domain/entities/user";
import { UserError } from "../../domain/error/userError";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";
import { UpdateEmailDto } from "../dtos/updateEmail.dto";

export class UpdateUserEmailCommand {
    constructor(private userRepository: IUserRepository, private email: UpdateEmailDto, private userId: string) {

    }

    async execute(): Promise<IUserDocument> {
        const { email } = this.email;
        const user = await this.userRepository.findById(this.userId);
        if (!user) {
            throw UserError.UserNotFound();
        }
        const emailExists = await this.userRepository.findByEmail(email)
        if (emailExists) {
            throw UserError.EmailAlreadyExists();
        }

        user.email = email;
        const updatedUser = await this.userRepository.update(user)

        return updatedUser;
    }
}