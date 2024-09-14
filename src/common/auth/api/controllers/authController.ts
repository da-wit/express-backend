import { Request, Response } from "express";
import { ILoginService } from "../../app/interface/ILoginService";
import { LogInDto } from "../../app/dtos/login.dto";
import { validate } from "class-validator";
import { UserError } from "../../../../user/domain/error/userError";
import { Role } from "../../../Roles/Role";
import { AuthError } from "../../domain/errors/authErrors";

export class AuthController {
    constructor(private loginService: ILoginService) {

    }

    isRoleValid = (role: string): boolean => {
        return Object.values(Role).includes(role as Role)
    }


    public logIn = async (req: Request, res: Response) => {
        try {
            const { body, params: { role } } = req;

            const logInDate = new LogInDto(body.email, body.password)

            const isRoleValid = this.isRoleValid(role);

            if (!isRoleValid) {
                return res.status(400).send({ error: AuthError.InvalidRole().message })
            }

            const errors = await validate(logInDate);
            if (errors.length > 0) {
                return res.status(400).send({ errors });
            }

            const result = await this.loginService.login(logInDate, role);
            console.log(result)

            return res.status(200).send({ "access token": result });
        } catch (error) {
            if (error instanceof UserError) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: (error as any).message });
        }

    }
}