import { SellerError } from "../../domain/errors/sellerError";
import { ISellerDocument } from "../../domain/repository/ISellerDocument";
import { ISellerRepository } from "../../domain/repository/ISellerRepository";
import { UpdateUsernameDto } from "../dtos/UpdateUsername.dto";

export class UpdateUserNameCommand {
    private _sellerRepo: ISellerRepository;
    private username: UpdateUsernameDto;
    private userId: string;
    constructor(sellerRepo: ISellerRepository, userName: UpdateUsernameDto, id: string) {
        this._sellerRepo = sellerRepo
        this.username = userName
        this.userId = id
    }

    async execure(): Promise<ISellerDocument> {
        const { username } = this.username;
        const seller = await this._sellerRepo.findById(this.userId);
        if (!seller) throw SellerError.SellerNotfound();
        const userNameExistes = await this._sellerRepo.findByUserName(username);
        if (userNameExistes) throw SellerError.UserNameAlreadyExists();

        seller.username = username;
        return await this._sellerRepo.update(seller);

    }
}