import { IUserRepository } from "../../../../user/domain/repositories/IUserRepository";
import { IEncryptionService } from "../../domain/service/IEncryptionService";
import { ITokenService } from "../../domain/service/ITokenService";
import { LogInCommand } from "../command/loginCommand";
import { LogInDto } from "../dtos/login.dto";
import { ILoginService } from "../interface/ILoginService";

export class LoginService implements ILoginService {
    constructor() {
    }

    async login(userDate: LogInDto): Promise<string> {
        const command = new LogInCommand(userDate)
        return command.execute()
    }
}