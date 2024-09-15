import { Houses } from "../entities/houses";
import { IHousesDocument } from "./IHousesDocument";

export interface IHouseRepository {
    findById(id: string): Promise<IHousesDocument | null>;
    findByAddress(address: string): Promise<IHousesDocument[]>;
    findByPrice(price: string): Promise<IHousesDocument[]>
    findAll(): Promise<IHousesDocument[]>
    save(house: IHousesDocument): Promise<IHousesDocument>;
    update(house: IHousesDocument): Promise<IHousesDocument>;
    delete(house_id: string): Promise<IHousesDocument | null>
}