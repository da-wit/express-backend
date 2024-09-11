import { UserError } from "../../../../user/domain/error/userError";
import { IUserRepository } from "../../../../user/domain/repositories/IUserRepository";
import { serviceContainer } from "../../../core/serviceContainer";
import { IEncryptionService } from "../../domain/service/IEncryptionService";
import { ITokenService } from "../../domain/service/ITokenService";
import { LogInDto } from "../dtos/login.dto";

export class LogInCommand {
    private _tokenService = serviceContainer.tokenService;
    private _encryptionService = serviceContainer.encryptionService;
    private _userRepo = serviceContainer.userRepository;

    constructor(private userData: LogInDto) { }

    async execute(): Promise<string> {

        const user = await this._userRepo.findByEmail(this.userData.email)
        if (!user) {
            throw UserError.InvalidCredential();
        }
        const validPassword = await this._encryptionService.validatePassword(this.userData.password, user.password);
        if (!validPassword) throw UserError.InvalidCredential();

        const accessToken = await this._tokenService.generateToken(user)
        console.log("aaaaaaaaa", accessToken)
        return accessToken;

    }
}