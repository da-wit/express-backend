import { SellerError } from "../../domain/errors/sellerError";
import { ISellerDocument } from "../../domain/repository/ISellerDocument";
import { ISellerRepository } from "../../domain/repository/ISellerRepository";
import { UpdateEmailDto } from "../dtos/updateEmail.dto";

export class UpdateEmailCommand {
    private _sellerRepo: ISellerRepository;
    private email: UpdateEmailDto;
    private userId: string;
    constructor(sellerRepo: ISellerRepository, updateEmailDto: UpdateEmailDto, id: string) {
        this._sellerRepo = sellerRepo;
        this.email = updateEmailDto;
        this.userId = id;
    }

    async execute(): Promise<ISellerDocument> {
        const { email } = this.email
        const seller = await this._sellerRepo.findById(this.userId);

        if (!seller) throw SellerError.SellerNotfound();
        const isEmailExists = await this._sellerRepo.findByEmail(email);
        if (isEmailExists) throw SellerError.EmailAlreadyExists();
        console.log(this.email)

        seller.email = email;
        console.log(seller)
        console.log(seller.email)
        return await this._sellerRepo.update(seller);
    }
}