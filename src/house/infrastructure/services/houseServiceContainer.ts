import { ISellerModel } from "../../../seller/infrastructure/database/ISellerModel";
import SellerModel from "../../../seller/infrastructure/database/SellerModel";
import { HouseController } from "../../api/controllers/HouseController";
import { IHouseController } from "../../api/controllers/IHouseController";
import { IHouseService } from "../../app/interface/IHouseService";
import { HouseService } from "../../app/services/HouseService";
import { IHouseRepository } from "../../domain/repository/IHouseRepository";
import HouseModel from "../database/HouseModel";
import { IHouseModel } from "../database/IHouseModel";
import { HouseRepository } from "../repository/HouseRepository";

const houseModel: IHouseModel = HouseModel;
const houseRepository: IHouseRepository = new HouseRepository(houseModel);
const houseService: IHouseService = new HouseService()
const houseController: IHouseController = new HouseController(houseService)


export const houseServiceContainer = {
    houseRepo: houseRepository,
    houseSerive: houseService,
    houseController: houseController
}
