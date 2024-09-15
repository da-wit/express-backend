import { IHouseRepository } from "../../domain/repository/IHouseRepository";
import { IHousesDocument } from "../../domain/repository/IHousesDocument";
import { IHouseModel } from "../database/IHouseModel";

export class HouseRepository implements IHouseRepository {
    private _houseModel: IHouseModel;


    constructor(houseModel: IHouseModel) {
        this._houseModel = houseModel;


    }
    async findById(id: string): Promise<IHousesDocument | null> {
        const house = await this._houseModel.findById(id);
        if (!house) {
            return null
        }
        return house
    }

    async findByAddress(address: string): Promise<IHousesDocument[]> {
        return await this._houseModel.find({ address: address });
    }

    async findByPrice(price: string): Promise<IHousesDocument[]> {
        return await this._houseModel.find({ price: price });
    }

    async findAll(): Promise<IHousesDocument[]> {
        return await this._houseModel.find();
    }

    async save(house: IHousesDocument): Promise<IHousesDocument> {
        const newHouse = new this._houseModel(house);
        await newHouse.save();

        // await this._sellerModel.findByIdAndUpdate(newHouse.sellerId, {
        //     $push: { housesId: newHouse._id }
        // })
        return newHouse;
    }

    async update(house: IHousesDocument): Promise<IHousesDocument> {

        const update = await this._houseModel.findByIdAndUpdate(house.id, house, { new: true });

        if (!update) throw new Error("sdafhhfdshf")

        return update;
    }

    async delete(house_id: string): Promise<IHousesDocument | null> {
        return await this._houseModel.findByIdAndDelete(house_id);

    }
}