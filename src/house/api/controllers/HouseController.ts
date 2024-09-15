import { Request, Response } from "express";
import { IHouseController } from "./IHouseController";
import { IHouseService } from "../../app/interface/IHouseService";
import { CreateHouseDto } from "../../app/dtos/CreateHouse.dto";
import { validate } from "class-validator";
import { SellerError } from "../../../seller/domain/errors/sellerError";
import { HouseErrors } from "../../domain/errors/HouseErrors";

export class HouseController implements IHouseController {
    private _houseService: IHouseService
    constructor(houseService: IHouseService) {
        this._houseService = houseService
    }
    createHouse = async (req: Request, res: Response): Promise<Response> => {
        try {

            if (!req.file) {
                throw HouseErrors.FileNotUploaded();
            }

            const { housename, address, price } = req.body;


            const sellerId = req.user?.id

            const createDto = new CreateHouseDto(housename, address, price, req.file.path);
            const errors = await validate(createDto);
            if (errors.length > 0) {
                return res.status(400).send({ errors })
            }

            const house = await this._houseService.createHouse(createDto, sellerId);
            return res.status(201).send(house)
        } catch (error) {
            if (error instanceof SellerError) {
                return res.status(400).send({ error: error.message })
            } else if (error instanceof HouseErrors) {
                return res.status(400).send({ error: error.message })
            }

            return res.status(400).send({ error: (error as any).message })

        }
    }

    deleteHouse = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const seller_id = req.user?.id;
            const result = await this._houseService.deleteHouse(id, seller_id)
            return res.status(200).send(result)
        } catch (error) {
            if (error instanceof SellerError) {
                return res.status(400).send({ error: error.message })
            } else if (error instanceof HouseErrors) {
                return res.status(400).send({ error: error.message })
            }
            return res.status(400).send({ error: (error as any).message })
        }
    }

}