import { IEncryptionService } from "../../../common/auth/domain/service/IEncryptionService";
import { SellerError } from "../../domain/errors/sellerError";
import { ISellerDocument } from "../../domain/repository/ISellerDocument";
import { ISellerRepository } from "../../domain/repository/ISellerRepository";
import { UpdatePasswordDto } from "../dtos/UpdatePassword.dto";

export class UpdatePasswordCommand {
    private _sellerRepo: ISellerRepository;
    private _encryption: IEncryptionService;
    private updatePasswordDto: UpdatePasswordDto;
    private userId: string;

    constructor(sellerRepo: ISellerRepository, encryption: IEncryptionService, updatePasswordDto: UpdatePasswordDto, id: string) {
        this._sellerRepo = sellerRepo;
        this._encryption = encryption;
        this.updatePasswordDto = updatePasswordDto;
        this.userId = id;
    }

    async execute(): Promise<ISellerDocument> {
        const { oldPassword, newPassword, confirmPassword } = this.updatePasswordDto;

        const seller = await this._sellerRepo.findById(this.userId);

        if (!seller) throw SellerError.SellerNotfound();

        const isOldPasswordValid = await this._encryption.validatePassword(oldPassword, seller.password);

        if (!isOldPasswordValid) throw SellerError.InvalidPassword();

        const doesPasswordMatch = newPassword === confirmPassword;

        if (!doesPasswordMatch) throw SellerError.PasswordMismatched();

        const hashedPassword = await this._encryption.hashPassword(newPassword);

        seller.password = hashedPassword;

        return this._sellerRepo.update(seller)

    }

}
