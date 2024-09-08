import { Request, Response } from "express";
import { IUserService } from "../../app/interfaces/IUserService";
import { CreateUserDto } from "../../app/dtos/createUser.dto";
import { validate } from "class-validator";
import { UserError } from "../../domain/error/userError";


export class UserController {
    constructor(private userService: IUserService) { }

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

            const newUser = await this.userService.crateUser(userDate);

            return response.status(201).send(newUser);
        } catch (error) {
            if (error instanceof UserError) {
                return response.status(400).json({ error: error.message });
            }
            return response.status(500).json({ error: (error as any).message });
        }
    }
}