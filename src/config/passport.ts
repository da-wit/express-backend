import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { serviceContainer } from "../common/core/serviceContainer";
import { userServiceContainer } from "../user/infrastructure/services/userServiceContainer";
import { UserPayload } from "../user/api/interfaces/userPayload";

const tokenService = serviceContainer.tokenService;
const userRepo = userServiceContainer.userRepository;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!
}

export const passportConfig = (passport: any) => {
    passport.use(
        new jwtStrategy(options, async (jwtPayload: UserPayload, done) => {
            try {
                const user = await userRepo.findById(jwtPayload.id);
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                console.log("Error verifying token:", error);
                return done({
                    error: "Invalid or expired token"
                }, false)
            }
        })
    )
}