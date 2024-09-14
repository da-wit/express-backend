import { sellerServiceContainer } from "../../../../seller/infrastructure/services/sellerServiceContainer";
import { userServiceContainer } from "../../../../user/infrastructure/services/userServiceContainer";
import { serviceContainer } from "../../../core/serviceContainer";
import { Role } from "../../../Roles/Role";
import { AuthError } from "../../domain/errors/authErrors";
import { LogInDto } from "../dtos/login.dto";

export class LogInCommand {
    private _tokenService = serviceContainer.tokenService;
    private _encryptionService = serviceContainer.encryptionService;
    private _userRepo = userServiceContainer.userRepository;
    private _sellerRepo = sellerServiceContainer.sellerRepo;

    constructor(private logInData: LogInDto, private role: Role) { }

    async execute(): Promise<string> {

        // const user = await this.role === Role.USER ? this._userRepo.findByEmail(this.logInData.email)
        const repo = this.role === Role.USER ? this._userRepo : this._sellerRepo;
        const user = await repo.findByEmail(this.logInData.email)
        // const user = await this._userRepo.findByEmail(this.userData.email)
        if (!user) {
            throw AuthError.InvalidCredential();
        }
        const validPassword = await this._encryptionService.validatePassword(this.logInData.password, user.password);
        if (!validPassword) throw AuthError.InvalidCredential();

        const accessToken = await this._tokenService.generateToken(user)
        console.log("aaaaaaaaa", accessToken)
        return accessToken;

    }
}