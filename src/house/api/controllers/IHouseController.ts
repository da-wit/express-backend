import { Request, Response } from "express";

export interface IHouseController {
    createHouse(req: Request, res: Response): Promise<Response>;
    deleteHouse(req: Request, res: Response): Promise<Response>;
}