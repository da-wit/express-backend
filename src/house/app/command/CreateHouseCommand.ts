import { SellerError } from "../../../seller/domain/errors/sellerError";
import { ISellerRepository } from "../../../seller/domain/repository/ISellerRepository";
import { Houses } from "../../domain/entities/houses";
import { IHouseRepository } from "../../domain/repository/IHouseRepository";
import { IHousesDocument } from "../../domain/repository/IHousesDocument";
import { CreateHouseDto } from "../dtos/CreateHouse.dto";

export class CreateHouseCommand {
    private _houseRepo: IHouseRepository;
    private _sellerRepo: ISellerRepository;
    private createHouseDto: CreateHouseDto;
    private sellerId: string;
    constructor(housRepo: IHouseRepository, sellerRepo: ISellerRepository, createDto: CreateHouseDto, id: string) {
        this._houseRepo = housRepo
        this._sellerRepo = sellerRepo
        this.createHouseDto = createDto
        this.sellerId = id
    }

    async execute(): Promise<IHousesDocument> {
        const { housename, address, price, imagepath } = this.createHouseDto;

        const seller = await this._sellerRepo.findById(this.sellerId);

        if (!seller) throw SellerError.SellerNotfound();

        const house: IHousesDocument = { housename: housename, address: address, price: price, imagepath: imagepath, sellerId: seller._id } as IHousesDocument;

        return await this._houseRepo.save(house);
    }
}