import { Model } from "mongoose";
import { IHousesDocument } from "../../domain/repository/IHousesDocument";

export interface IHouseModel extends Model<IHousesDocument> { }