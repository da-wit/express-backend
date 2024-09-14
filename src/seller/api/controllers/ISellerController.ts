import { Request, Response } from "express"

export interface ISellerController {
    createSeller(req: Request, res: Response): Promise<Response>
    updateCompanyname(req: Request, res: Response): Promise<Response>
    updateEmail(req: Request, res: Response): Promise<Response>
    updateUsename(req: Request, res: Response): Promise<Response>
    updatePassword(req: Request, res: Response): Promise<Response>

    getSellers(req: Request, res: Response): Promise<Response>
}