import { User } from "../entities/user";

export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByUserName(userName: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    save(user: User): Promise<void>;
}