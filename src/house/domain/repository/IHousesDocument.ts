import mongoose from "mongoose";
export interface IHousesDocument extends Document {
    id: string;
    housename: string;
    address: string;
    price: string;
    imagepath: string;
    sellerId: mongoose.Types.ObjectId;
}

