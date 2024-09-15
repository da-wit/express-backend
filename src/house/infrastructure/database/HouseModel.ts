import mongoose, { Callback, CallbackError } from "mongoose";
import { IHousesDocument } from "../../domain/repository/IHousesDocument";
import { IHouseModel } from "./IHouseModel";
import SellerModel from "../../../seller/infrastructure/database/SellerModel";

const houseSchema = new mongoose.Schema<IHousesDocument>({
    housename: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: String, required: true },
    imagepath: { type: String, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true }
}, {
    timestamps: true
})


houseSchema.post('save', async function (doc: IHousesDocument, next) {

    try {
        await SellerModel.findByIdAndUpdate(doc.sellerId, {
            $push: { housesId: doc.id }
        });
        next();
    } catch (error: unknown) {
        next(error as CallbackError);
    }

})

houseSchema.pre('findOneAndDelete', async function (next) {

    try {
        const doc: IHousesDocument | null = await this.model.findOne(this.getQuery())
        if (doc) {
            await SellerModel.findByIdAndUpdate(doc.sellerId, {
                $pull: { housesId: doc.id }
            })
        }

        next()
    } catch (error) {
        next(error as CallbackError)
    }

})

const HouseModel = mongoose.model<IHousesDocument, IHouseModel>('Houses', houseSchema);

export default HouseModel;