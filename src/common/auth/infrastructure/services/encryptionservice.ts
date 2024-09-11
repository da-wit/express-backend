import bcrypt from "bcryptjs"
import { IEncryptionService } from "../../domain/service/IEncryptionService";



export class EncryptionService implements IEncryptionService {
    private saltRounds = 10;

    hashPassword(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(this.saltRounds));
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}