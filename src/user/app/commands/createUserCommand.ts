import { IEncryptionService } from "../../../common/auth/domain/service/IEncryptionService";
import { User } from "../../domain/entities/user";
import { UserError } from "../../domain/error/userError";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";
import { CreateUserDto } from "../dtos/createUser.dto";

export class CreateUserCommand {
    constructor(
        private userRepository: IUserRepository,
        private userData: CreateUserDto,
        private encryption: IEncryptionService
    ) { }

    async execute(): Promise<IUserDocument> {
        // console.log(this.userData, "command")
        console.log('Checking for existing user...');
        const { username, email, password } = this.userData;
        const existingUser = await this.userRepository.findByUserName(this.userData.username);
        console.log('Existing user check completed', existingUser);
        if (existingUser) throw UserError.UserNameAlreadyExists();

        const emailExists = await this.userRepository.findByEmail(this.userData.email);
        if (emailExists) throw UserError.EmailAlreadyExists();

        const hashedPassword = await this.encryption.hashPassword(password);

        const newUser = new User(username, email, hashedPassword);
        console.log(newUser, "newuser")

        return await this.userRepository.save(newUser);
    }
}