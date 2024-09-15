import express from "express";
import connectDatabase from "./config/database.config";
import userRouter from "./user/api/routes/userRoute";
import authRouter from "./common/auth/api/routes/authRoutes";
import { passportConfig } from "./config/passport";
import passport from "passport";
import sellerRoutes from "./seller/api/routes/SellerRoutes";
import houseRoutes from "./house/api/routes/HouseRoutes";

const app = express();

app.use(express.json());


passportConfig(passport)
connectDatabase();

app.use(passport.initialize())

app.use('/api/auth', authRouter)

app.use('/api', userRouter);
app.use('/api', sellerRoutes);
app.use('/api', houseRoutes);


export default app;