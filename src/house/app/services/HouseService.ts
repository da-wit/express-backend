import { sellerServiceContainer } from "../../../seller/infrastructure/services/sellerServiceContainer";
import { IHousesDocument } from "../../domain/repository/IHousesDocument";
import { houseServiceContainer } from "../../infrastructure/services/houseServiceContainer";
import { CreateHouseCommand } from "../command/CreateHouseCommand";
import { DeleteHouseCommand } from "../command/DeleteHouseCommand";
import { CreateHouseDto } from "../dtos/CreateHouse.dto";
import { IHouseService } from "../interface/IHouseService";

export class HouseService implements IHouseService {
    createHouse(creatDto: CreateHouseDto, sellerId: string): Promise<IHousesDocument> {
        const command = new CreateHouseCommand(houseServiceContainer.houseRepo, sellerServiceContainer.sellerRepo, creatDto, sellerId);

        return command.execute();
    }

    deleteHouse(houseId: string, sellerId: string): Promise<IHousesDocument | null> {
        const command = new DeleteHouseCommand(houseServiceContainer.houseRepo, sellerServiceContainer.sellerRepo, houseId, sellerId);

        return command.execute();
    }
}