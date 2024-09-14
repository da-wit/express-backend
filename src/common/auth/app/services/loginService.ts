import { IUserRepository } from "../../../../user/domain/repositories/IUserRepository";
import { Role } from "../../../Roles/Role";
import { IEncryptionService } from "../../domain/service/IEncryptionService";
import { ITokenService } from "../../domain/service/ITokenService";
import { LogInCommand } from "../command/loginCommand";
import { LogInDto } from "../dtos/login.dto";
import { ILoginService } from "../interface/ILoginService";

export class LoginService implements ILoginService {
    constructor() {
    }

    async login(userDate: LogInDto, role: Role): Promise<string> {
        const command = new LogInCommand(userDate, role)
        return command.execute()
    }
}