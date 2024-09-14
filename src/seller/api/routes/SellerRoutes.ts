import { Router } from "express";
import { sellerServiceContainer } from "../../infrastructure/services/sellerServiceContainer";
import { authenticate } from "../../../common/auth/api/middleware/authMiddleware";
import { SellerController } from "../controllers/SellerController";



const sellerRoutes = Router();

const sellerController = sellerServiceContainer.sellerController;


sellerRoutes.post('/seller', sellerController.createSeller);
sellerRoutes.patch('/seller/company-name', authenticate, sellerController.updateCompanyname);
sellerRoutes.patch('/seller/email', authenticate, sellerController.updateEmail);
sellerRoutes.patch('/seller/user-name', authenticate, sellerController.updateUsename);
sellerRoutes.patch('/seller/password', authenticate, sellerController.updatePassword)
sellerRoutes.get('/sellers', authenticate, sellerController.getSellers)


export default sellerRoutes;
