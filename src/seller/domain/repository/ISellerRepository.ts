import { Seller } from "../entities/seller";
import { ISellerDocument } from "./ISellerDocument";

export interface ISellerRepository {
    findById(id: string): Promise<ISellerDocument | null>;
    findByCompanyName(companyname: string): Promise<ISellerDocument[] | null>;
    findByUserName(username: string): Promise<ISellerDocument | null>;
    findByEmail(email: string): Promise<ISellerDocument | null>;
    findAll(): Promise<ISellerDocument[]>
    save(seller: Seller): Promise<ISellerDocument>;
    update(seller: ISellerDocument): Promise<ISellerDocument>
}