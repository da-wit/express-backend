import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { IEncryptionService } from "../../domain/service/IEncryptionService";
import { EncryptionService } from "../../infrastructure/services/encryptionservice";
import { UserRepository } from "../../../../user/infrastructure/repositories/UserRepository";
import UserModel from "../../../../user/infrastructure/database/models/UserModel";
import { LoginService } from "../../app/services/loginService";
import { ITokenService } from "../../domain/service/ITokenService";
import { TokenService } from "../../infrastructure/services/tokenService";



const authRouter = Router()


// const encryptionService: IEncryptionService = new EncryptionService();

// const userRepository = new UserRepository(UserModel);
// const userService = new UserService(userRepository);
// const userController = new UserController(userService)
// const tokenService: ITokenService = new TokenService()
// const encryptionService: IEncryptionService = new EncryptionService();
// const userRepository = new UserRepository(UserModel);
const loginService = new LoginService()

const authController = new AuthController(loginService)


authRouter.post('/login/:role', authController.logIn);


export default authRouter;





