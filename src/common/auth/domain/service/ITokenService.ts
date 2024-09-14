import { ISellerDocument } from "../../../../seller/domain/repository/ISellerDocument";
import { UserPayload } from "../../../../user/api/interfaces/userPayload";
import { IUserDocument } from "../../../../user/infrastructure/database/models/UserModel";


export interface ITokenService {
    generateToken(user: IUserDocument | ISellerDocument): Promise<string>;
    verifyToken(accessToken: string): Promise<any>;
}