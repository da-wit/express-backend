import { SellerError } from "../../domain/errors/sellerError";
import { ISellerDocument } from "../../domain/repository/ISellerDocument";
import { ISellerRepository } from "../../domain/repository/ISellerRepository";
import { UpdateCompanynameDto } from "../dtos/UpdateCompanyname.dto";

export class UpdateCompanynameCommand {
    private _sellerRepo: ISellerRepository;
    private newName: UpdateCompanynameDto;
    private userId: string;
    constructor(sellerRepo: ISellerRepository, name: UpdateCompanynameDto, id: string) {
        this._sellerRepo = sellerRepo;
        this.newName = name;
        this.userId = id;
    }

    async execute(): Promise<ISellerDocument> {
        const { companyname } = this.newName;
        const seller = await this._sellerRepo.findById(this.userId);

        if (!seller) throw SellerError.SellerNotfound();
        seller.companyname = companyname;
        console.log(seller)
        console.log(seller.companyname)
        return await this._sellerRepo.update(seller)


    }
}