import { Request, Response } from "express";
import { IUserService } from "../../app/interfaces/IUserService";
import { CreateUserDto } from "../../app/dtos/createUser.dto";
import { validate } from "class-validator";
import { UserError } from "../../domain/error/userError";
import { userServiceContainer } from "../../infrastructure/services/userServiceContainer";
import { UpdateUserNameDto } from "../../app/dtos/updateUserName.dto";
import { User } from "../../domain/entities/user";
import { UserPayload } from "../interfaces/userPayload";
import { UpdateEmailDto } from "../../app/dtos/updateEmail.dto";
import { UpdatePasswordDto } from "../../app/dtos/updatePassword.dto";


export class UserController {
    private _userService = userServiceContainer.userService;
    constructor() { }

    public createUser = async (request: Request, response: Response) => {
        try {

            const { body } = request;
            console.log(body)
            const userDate = new CreateUserDto(body.username, body.email, body.password);
            console.log(userDate)

            const errors = await validate(userDate);
            if (errors.length > 0) {
                return response.status(400).json({ errors });
            }

            const newUser = await this._userService.crateUser(userDate);

            return response.status(201).send(newUser);
        } catch (error) {
            if (error instanceof UserError) {
                return response.status(400).json({ error: error.message });
            }
            return response.status(500).json({ error: (error as any).message });
        }
    }

    public updateUserPassword = async (req: Request, res: Response) => {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body;
            const userPassword = new UpdatePasswordDto(oldPassword, newPassword, confirmPassword);

            const errors = await validate(userPassword);
            if (errors.length > 0) {
                return res.status(400).send({ errors })
            }
            const userId = req.user!.id;
            const updatedUser = await this._userService.updatePassword(userPassword, userId);
            return res.status(200).send(updatedUser)
        } catch (error) {
            if (error instanceof UserError) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: (error as any).message });
        }
    }

    public updateUserName = async (req: Request, res: Response) => {
        try {
            const { username } = req.body;
            const newUserName = new UpdateUserNameDto(username);

            const errors = await validate(newUserName);
            if (errors.length > 0) {
                return res.status(400).send({ errors })
            }
            const userId = req.user!.id;
            const updateUser = await this._userService.updateUserName(newUserName, userId);
            return res.status(200).send(updateUser)
        } catch (error) {
            if (error instanceof UserError) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: (error as any).message });
        }
    }

    public updateUserEmail = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            const newEmail = new UpdateEmailDto(email);

            const errors = await validate(newEmail);
            if (errors.length > 0) {
                return res.status(400).send({ errors })
            }
            const userId = req.user!.id;
            const updatedUser = await this._userService.updateEmail(newEmail, userId)
            return res.status(200).send(updatedUser)
        } catch (error) {
            if (error instanceof UserError) {
                return res.status(400).send({ error: error.message })
            }
            return res.status(500).send({ error: (error as any).message })
        }
    }

    public getUsers = async (req: Request, res: Response) => {
        console.log(req.user)
        console.log(req.user?.id)

        try {
            const users = await this._userService.getUsers();
            return res.status(200).send(users)
        } catch (error) {

        }
    }
}