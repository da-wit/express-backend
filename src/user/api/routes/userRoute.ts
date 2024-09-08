import { Router } from "express";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { UserService } from "../../app/services/userService";
import { UserController } from "../controllers/userController";
import UserModel from "../../infrastructure/database/models/UserModel";
import { IUserModel } from "../../infrastructure/database/models/IUserModel";


const userRouter = Router();

const userRepository = new UserRepository(UserModel as IUserModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService)



userRouter.post('/users', userController.createUser);


export default userRouter;