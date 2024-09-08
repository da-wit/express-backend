import { User } from "../entities/user";

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByUserName(userName: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    save(user: User): Promise<User>;
    delete(id: string): Promise<boolean>;
}