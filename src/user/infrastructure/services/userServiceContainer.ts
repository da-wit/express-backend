import { serviceContainer } from "../../../common/core/serviceContainer"
import { UserController } from "../../api/controllers/userController"
import { IUserService } from "../../app/interfaces/IUserService"
import { UserService } from "../../app/services/userService"
import { IUserRepository } from "../../domain/repositories/IUserRepository"
import { IUserModel } from "../database/models/IUserModel"
import UserModel from "../database/models/UserModel"
import { UserRepository } from "../repositories/UserRepository"



// const userServiceContainer: any = {}
// const userModel: IUserModel = UserModel;
// const userRepo: IUserRepository = new UserRepository(userModel);
// userServiceContainer.userModel = userModel;
// userServiceContainer.userRepository = userRepo
// // userServiceContainer.userService = new UserService(use);
// userServiceContainer.userController = new UserController(userServiceContainer.userService)


// export { userServiceContainer }

const userModel: IUserModel = UserModel;
const userRepo: IUserRepository = new UserRepository(userModel);
const userService: IUserService = new UserService(userRepo, serviceContainer.encryptionService);

export const userServiceContainer = {
    userRepository: userRepo,
    userService: userService,
}