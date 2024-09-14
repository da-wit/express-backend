import { Model } from "mongoose";
import { ISellerDocument } from "../../domain/repository/ISellerDocument";

export interface ISellerModel extends Model<ISellerDocument> { };