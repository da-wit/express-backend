import { IHousesDocument } from "../../domain/repository/IHousesDocument";
import { CreateHouseDto } from "../dtos/CreateHouse.dto";

export interface IHouseService {
    createHouse(creatDto: CreateHouseDto, sellerId: string): Promise<IHousesDocument>
    deleteHouse(houseId: string, sellerId: string): Promise<IHousesDocument | null>

}