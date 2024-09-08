import { User } from "../../domain/entities/user";
import { UserError } from "../../domain/error/userError";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserDto } from "../dtos/createUser.dto";

export class CreateUserCommand {
    constructor(
        private userRepository: IUserRepository,
        private userData: CreateUserDto
    ) { }

    async execute(): Promise<User> {
        // console.log(this.userData, "command")
        console.log('Checking for existing user...');
        const existingUser = await this.userRepository.findByUserName(this.userData.username);
        console.log('Existing user check completed', existingUser);
        if (existingUser) throw UserError.UserNameAlreadyExists();

        const newUser = new User(this.userData.username, this.userData.email, this.userData.password);
        console.log(newUser, "newuser")

        return await this.userRepository.save(newUser);
    }
}