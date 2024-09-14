import { Seller } from "../../domain/entities/seller";
import { SellerError } from "../../domain/errors/sellerError";
import { ISellerDocument } from "../../domain/repository/ISellerDocument";
import { ISellerRepository } from "../../domain/repository/ISellerRepository";
import { ISellerModel } from "../database/ISellerModel";

export class SellerRepository implements ISellerRepository {
    constructor(private _sellerModel: ISellerModel) { }
    async save(seller: Seller): Promise<ISellerDocument> {
        const newSeller = new this._sellerModel(seller);
        await newSeller.save();
        return newSeller;
    }

    async update(seller: ISellerDocument): Promise<ISellerDocument> {
        const existingSeller = await this._sellerModel.findByIdAndUpdate(seller.id, seller, { new: true });
        if (!existingSeller) {
            throw SellerError.SellerNotfound();
        }
        return existingSeller;
    }
    async findById(id: string): Promise<ISellerDocument | null> {
        const seller = await this._sellerModel.findById(id);
        if (!seller) {
            return null
        }
        return seller;
    }

    async findByCompanyName(companyname: string): Promise<ISellerDocument[] | null> {
        const sellers = (await this._sellerModel.find()).filter((company) => company.companyname === companyname);
        if (!sellers) {
            return null
        }
        return sellers;
    }
    async findByEmail(email: string): Promise<ISellerDocument | null> {
        const seller = await this._sellerModel.findOne({ email: email })
        if (!seller) {
            return null
        }
        return seller;
    }

    async findByUserName(username: string): Promise<ISellerDocument | null> {
        const seller = await this._sellerModel.findOne({ username: username });
        if (!seller) {
            return null
        }
        return seller
    }
    async findAll(): Promise<ISellerDocument[]> {
        const sellers = await this._sellerModel.find().sort({ createdAt: -1 })
        return sellers;
    }
}