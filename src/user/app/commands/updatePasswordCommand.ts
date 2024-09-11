import { IEncryptionService } from "../../../common/auth/domain/service/IEncryptionService";
import { UserError } from "../../domain/error/userError";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUserDocument } from "../../infrastructure/database/models/UserModel";
import { UpdatePasswordDto } from "../dtos/updatePassword.dto";

export class UpdatePasswordCommand {
    constructor(private userRepository: IUserRepository, private encryption: IEncryptionService, private newPassword: UpdatePasswordDto, private userId: string) { }

    async execute(): Promise<IUserDocument> {
        const { oldPassword, newPassword, confirmPassword } = this.newPassword;
        const user = await this.userRepository.findById(this.userId)
        if (!user) {
            throw UserError.UserNotFound();
        }
        const isPasswordValid = await this.encryption.validatePassword(oldPassword, user.password);
        if (!isPasswordValid) {
            throw UserError.OldPasswordIsInCorrect();
        }
        const isPasswordMismatched = newPassword === confirmPassword ? true : false;
        if (!isPasswordMismatched) {
            throw UserError.PasswordMismatch();
        }
        const hashedPassword = this.encryption.hashPassword(newPassword);
        user.password = hashedPassword;
        const updatedUser = await this.userRepository.update(user);

        return updatedUser;
    }
}