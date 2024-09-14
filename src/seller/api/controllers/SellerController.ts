import { Request, Response } from "express";
import { ISellerService } from "../../app/interfaces/ISellerService";
import { sellerServiceContainer } from "../../infrastructure/services/sellerServiceContainer";
import { CreateSellerDto } from "../../app/dtos/CreateSeller.dto";
import { validate } from "class-validator";
import { SellerError } from "../../domain/errors/sellerError";
import { ISellerController } from "./ISellerController";
import { UpdateCompanynameDto } from "../../app/dtos/UpdateCompanyname.dto";
import { UpdateEmailDto } from "../../app/dtos/UpdateEmail.dto";
import { UpdateUsernameDto } from "../../app/dtos/UpdateUsername.dto";
import { UpdatePasswordDto } from "../../app/dtos/UpdatePassword.dto";

export class SellerController implements ISellerController {
    private _sellerService: ISellerService;
    constructor(sellerService: ISellerService = sellerServiceContainer.sellerService) {
        this._sellerService = sellerService;
    }
    public createSeller = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { companyname, username, email, password } = req.body;
            const sellerData = new CreateSellerDto(companyname, username, email, password)

            const errors = await validate(sellerData);
            if (errors.length > 0) {
                return res.status(400).send({ errors });
            }

            const newSeller = await this._sellerService.createSeller(sellerData);

            return res.status(201).send(newSeller);

        } catch (error) {
            if (error instanceof SellerError) {
                return res.status(400).send({ error: error.message });
            }

            return res.status(500).send({ error: (error as any).message })
        }
    }
    public updateCompanyname = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { companyname } = req.body;
            const newCompanyName = new UpdateCompanynameDto(companyname)
            const errors = await validate(newCompanyName)
            if (errors.length > 0) {
                return res.status(400).send({ errors });
            }
            const userId = req.user?.id

            const updateSeller = await this._sellerService.updateCompanyName(newCompanyName, userId)
            return res.status(200).send(updateSeller)
        } catch (error) {
            if (error instanceof SellerError) {
                return res.status(400).send({ error: error.message })
            }
            return res.status(400).send({ error: (error as any).message })
        }
    }

    public updateEmail = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email } = req.body;
            const newEmail = new UpdateEmailDto(email);

            const errors = await validate(newEmail);
            if (errors.length > 0) {
                return res.status(400).send({ errors })
            }
            const userId = req.user?.id
            const updatedSeller = await this._sellerService.updateEmail(newEmail, userId)
            return res.status(201).send(updatedSeller);
        } catch (error) {
            if (error instanceof SellerError) {
                return res.status(400).send({ error: error.message });
            }

            return res.status(400).send({ error: (error as any).message })
        }
    }

    updateUsename = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { username } = req.body;

            const newUserName = new UpdateUsernameDto(username)
            const errors = await validate(newUserName)
            if (errors.length > 0) {
                return res.status(400).send({ errors });
            }
            const userId = req.user?.id

            const updatedSeller = await this._sellerService.updateUserName(newUserName, userId);

            return res.status(201).send(updatedSeller)
        } catch (error) {
            if (error instanceof SellerError) {
                return res.status(400).send({ error: error.message })
            }
            return res.status(400).send({ error: (error as any).message })
        }
    }

    public updatePassword = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body;
            const updatePasswordDto = new UpdatePasswordDto(oldPassword, newPassword, confirmPassword);

            const errors = await validate(updatePasswordDto);
            if (errors.length > 0) {
                return res.status(400).send({ errors });
            }
            const userId = req.user?.id;
            const updatedSeller = await this._sellerService.updatePassword(updatePasswordDto, userId);

            return res.status(201).send(updatedSeller);
        } catch (error) {
            if (error instanceof SellerError) {
                return res.status(400).send({ error: error.message })
            }

            return res.status(400).send({ error: (error as any).message })
        }
    }

    public getSellers = async (req: Request, res: Response): Promise<Response> => {
        try {
            const sellers = await this._sellerService.getSellers();
            return res.status(200).send(sellers);
        } catch (error) {
            if (error instanceof SellerError) {
                return res.status(400).send({ error: error.message })
            }
            return res.status(400).send({ error: (error as any).message })
        }
    }

}


