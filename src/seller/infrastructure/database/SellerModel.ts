import mongoose from "mongoose";
import { ISellerDocument } from "../../domain/repository/ISellerDocument";
import { Role } from "../../../common/Roles/Role";
import { ISellerModel } from "./ISellerModel";


const sellerSchema = new mongoose.Schema<ISellerDocument>({
    companyname: { type: String, required: true },
    username: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: Role.SELLER, enum: Object.values(Role) },
    housesId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Houses" }]
}, {
    timestamps: true
})


const SellerModel = mongoose.model<ISellerDocument, ISellerModel>('Seller', sellerSchema);

export default SellerModel;
