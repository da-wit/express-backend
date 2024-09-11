import UserModel from "../../user/infrastructure/database/models/UserModel";
import { UserRepository } from "../../user/infrastructure/repositories/UserRepository";
import { AuthController } from "../auth/api/controllers/authController";
import { LoginService } from "../auth/app/services/loginService";
import { EncryptionService } from "../auth/infrastructure/services/encryptionservice";
import { TokenService } from "../auth/infrastructure/services/tokenService";

export const serviceContainer = {
    tokenService: new TokenService(),
    encryptionService: new EncryptionService(),
    userRepository: new UserRepository(UserModel),
}