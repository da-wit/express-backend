import { ISellerController } from "../../api/controllers/ISellerController";
import { SellerController } from "../../api/controllers/SellerController";
import { ISellerService } from "../../app/interfaces/ISellerService";
import { SellerServices } from "../../app/services/SellerServices";
import { ISellerRepository } from "../../domain/repository/ISellerRepository";
import { ISellerModel } from "../database/ISellerModel";
import SellerModel from "../database/SellerModel";
import { SellerRepository } from "../repository/sellerRepository";



const sellerModel: ISellerModel = SellerModel;
const sellerRepo: ISellerRepository = new SellerRepository(sellerModel);
const sellerService: ISellerService = new SellerServices()
const sellerController: ISellerController = new SellerController(sellerService);


export const sellerServiceContainer = {
    sellerRepo: sellerRepo,
    sellerService: sellerService,
    sellerController: sellerController,
}

