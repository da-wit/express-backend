import { Seller } from "../../../seller/domain/entities/seller";
import { SellerError } from "../../../seller/domain/errors/sellerError";
import { ISellerRepository } from "../../../seller/domain/repository/ISellerRepository";
import { HouseErrors } from "../../domain/errors/HouseErrors";
import { IHouseRepository } from "../../domain/repository/IHouseRepository";
import { IHousesDocument } from "../../domain/repository/IHousesDocument";

export class DeleteHouseCommand {
    private _houseRepo: IHouseRepository;
    private _sellerRepo: ISellerRepository;
    private house_id: string;
    private seller_id: string;

    constructor(houseRepo: IHouseRepository, sellerRepo: ISellerRepository, houseId: string, sellerId: string) {
        this._houseRepo = houseRepo;
        this._sellerRepo = sellerRepo;
        this.house_id = houseId;
        this.seller_id = sellerId;
    }

    async execute(): Promise<IHousesDocument | null> {

        const house = await this._houseRepo.findById(this.house_id);

        if (!house) throw HouseErrors.HouseNotFound();

        const seller = await this._sellerRepo.findById(this.seller_id);

        if (!seller) throw SellerError.SellerNotfound();

        const isSellerHaveHouse = seller._id === house.sellerId;

        if (isSellerHaveHouse) throw HouseErrors.HouseNotFound();

        return await this._houseRepo.delete(this.house_id);

    }

}