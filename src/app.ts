import express from "express";
import connectDatabase from "./config/database.config";

const app = express();

app.use(express.json());

connectDatabase();


export default app;