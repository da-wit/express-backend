import { UserPayload } from "../../../../user/api/interfaces/userPayload";
import { Role } from "../../../Roles/Role";
import { ITokenService } from "../../domain/service/ITokenService";
import jwt from 'jsonwebtoken';

export class TokenService implements ITokenService {

    private accessTokenSecret: string;

    constructor() {
        this.accessTokenSecret = process.env.JWT_SECRET!;
    }

    public async generateToken(user: UserPayload): Promise<string> {
        // console.log(this.accessTokenSecret)
        // console.log(process.env.EXPIRESIN)
        return new Promise((resolve, reject) => {
            jwt.sign({ id: user.id, roel: user.role }, this.accessTokenSecret, { expiresIn: process.env.EXPIRESIN }, (err, token) => {
                if (err) {
                    return reject(err);
                }
                // console.log(token)
                resolve(token!)
            })
        })
    }

    public async verifyToken(token: string): Promise<UserPayload> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.accessTokenSecret, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded as UserPayload);
            });
        });
    }
}