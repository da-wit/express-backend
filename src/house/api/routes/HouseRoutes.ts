import { Router } from "express";
import { HouseController } from "../controllers/HouseController";
import { houseServiceContainer } from "../../infrastructure/services/houseServiceContainer";
import { authenticate } from "../../../common/auth/api/middleware/authMiddleware";
import upload from "../../../config/upload.config";

const houseRoutes = Router()

const houseController = houseServiceContainer.houseController
houseRoutes.post('/house', authenticate, upload.single('image'), houseController.createHouse)
houseRoutes.delete('/house/:id', authenticate, houseController.deleteHouse)
export default houseRoutes;