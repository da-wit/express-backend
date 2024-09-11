import { UserPayload } from "../../../../user/api/interfaces/userPayload";
import { Role } from "../../../Roles/Role";

export interface ITokenService {
    generateToken(user: UserPayload): Promise<string>;
    verifyToken(accessToken: string): Promise<any>;
}