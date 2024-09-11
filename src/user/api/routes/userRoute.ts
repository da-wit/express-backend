import { Router } from "express";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { UserService } from "../../app/services/userService";
import { UserController } from "../controllers/userController";
import UserModel from "../../infrastructure/database/models/UserModel";
import { IUserModel } from "../../infrastructure/database/models/IUserModel";
import { IEncryptionService } from "../../../common/auth/domain/service/IEncryptionService";
import { EncryptionService } from "../../../common/auth/infrastructure/services/encryptionservice";
import { authenticate } from "../../../common/auth/api/middleware/authMiddleware";



const userRouter = Router();

const userController = new UserController()



userRouter.post('/users', userController.createUser);
userRouter.patch('/user/update-user-name', authenticate, userController.updateUserName)
userRouter.patch('/user/update-email', authenticate, userController.updateUserEmail)
userRouter.patch('/user/update-password', authenticate, userController.updateUserPassword)
userRouter.get('/users', authenticate, userController.getUsers)


export default userRouter;