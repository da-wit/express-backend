import express from "express";
import connectDatabase from "./config/database.config";
import userRouter from "./user/api/routes/userroute";

const app = express();

app.use(express.json());

connectDatabase();

app.use('/api', userRouter);


export default app;