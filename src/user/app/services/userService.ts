import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserCommand } from "../commands/createUserCommand";
import { CreateUserDto } from "../dtos/createUser.dto";
import { IUserService } from "../interfaces/IUserService";

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) { }

    async crateUser(userData: CreateUserDto): Promise<User> {
        console.log(userData, "userService")
        const command = new CreateUserCommand(this.userRepository, userData);
        return await command.execute();
    }
}