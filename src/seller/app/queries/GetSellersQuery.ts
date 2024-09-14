import { ISellerDocument } from "../../domain/repository/ISellerDocument";
import { ISellerRepository } from "../../domain/repository/ISellerRepository";

export class GetSellersQuery {
    private _sellerRepo: ISellerRepository
    constructor(sellerRepo: ISellerRepository) {
        this._sellerRepo = sellerRepo
    }

    async execute(): Promise<ISellerDocument[]> {
        return await this._sellerRepo.findAll();
    }
}