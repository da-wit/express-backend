import { NextFunction, Request, Response } from "express";
import { TokenService } from "../../infrastructure/services/tokenService";
import { UserPayload } from "../../../../user/api/interfaces/userPayload";

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

const tokenService = new TokenService();

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if (authHeader) {
        const accessToken = authHeader.split(' ')[1];
        console.log("accessToken", accessToken)

        try {
            const decodedUser = await tokenService.verifyToken(accessToken);
            req.user = decodedUser;
            next();
        } catch (error) {
            return res.status(403).send({ error: "Invalid or expired token" });
        }

    } else {
        return res.status(401).send({ "error": "Unauthorized" })
    }
}

// import { NextFunction, Request, Response } from "express";
// import passport from 'passport';
// import { IUserDocument } from "../../../../user/infrastructure/database/models/UserModel";
// import { UserPayload } from "../../../../user/api/interfaces/userPayload";

// declare global {
//     namespace Express {
//         interface Request {
//             user?: User | undefined; // or the specific user type you're using
//         }
//     }
// }

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//     passport.authenticate('jwt', { session: false }, (err: any, user: IUserDocument) => {
//         if (err) {
//             return res.status(500).json({ error: "Internal Server Error" });
//         }
//         if (!user) {
//             // If no user is found, send unauthorized response
//             return res.status(401).json({ error: "Unauthorized" });
//         }
//         // Attach the user to the request object
//         req.user = user
//         next();
//     })(req, res, next);
// };
