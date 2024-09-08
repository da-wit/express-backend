import { User } from "../../domain/entities/user";
import { CreateUserDto } from "../dtos/createUser.dto";

export interface IUserService {
    crateUser(userData: CreateUserDto): Promise<User>;
}