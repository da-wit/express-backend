export interface IEncryptionService {
    hashPassword(password: string): string;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>

}