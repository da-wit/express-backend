import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";

export class GetUsersQuery {
    constructor(private userRepository: IUserRepository) { }

    async excute(): Promise<IUserDocument[]> {
        return this.userRepository.findAll();
    }
}