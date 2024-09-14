import { IEncryptionService } from "../../../common/auth/domain/service/IEncryptionService";
import { Seller } from "../../domain/entities/seller";
import { SellerError } from "../../domain/errors/sellerError";
import { ISellerDocument } from "../../domain/repository/ISellerDocument";
import { ISellerRepository } from "../../domain/repository/ISellerRepository";
import { CreateSellerDto } from "../dtos/CreateSeller.dto";

export class CreateSellerCommand {
    private _sellerRepo: ISellerRepository;
    private _encryption: IEncryptionService;
    private _sellerData: CreateSellerDto
    constructor(sellerRepo: ISellerRepository, encrption: IEncryptionService, sellerData: CreateSellerDto) {
        this._sellerRepo = sellerRepo;
        this._encryption = encrption;
        this._sellerData = sellerData;
    }

    async execute(): Promise<ISellerDocument> {
        const { companyname, username, email, password } = this._sellerData;
        const isUserNameExists = await this._sellerRepo.findByUserName(username);
        if (isUserNameExists) throw SellerError.UserNameAlreadyExists();
        const isEmailExists = await this._sellerRepo.findByEmail(email);
        if (isEmailExists) throw SellerError.EmailAlreadyExists();

        const hashedPassword = this._encryption.hashPassword(password);

        const newSeller = new Seller(companyname, username, email, hashedPassword);

        return await this._sellerRepo.save(newSeller)

    }
}