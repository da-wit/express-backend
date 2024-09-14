import { IEncryptionService } from "../../../common/auth/domain/service/IEncryptionService";
import { ISellerDocument } from "../../domain/repository/ISellerDocument";
import { ISellerRepository } from "../../domain/repository/ISellerRepository";
import { CreateSellerDto } from "../dtos/CreateSeller.dto";
import { UpdateCompanynameDto } from "../dtos/UpdateCompanyname.dto";
import { UpdateEmailDto } from "../dtos/updateEmail.dto";
import { UpdatePasswordDto } from "../dtos/UpdatePassword.dto";
import { UpdateUsernameDto } from "../dtos/UpdateUsername.dto";

export interface ISellerService {
    createSeller(sellerData: CreateSellerDto): Promise<ISellerDocument>
    updateCompanyName(companyname: UpdateCompanynameDto, id: string): Promise<ISellerDocument>
    updateEmail(email: UpdateEmailDto, id: string): Promise<ISellerDocument>
    updateUserName(username: UpdateUsernameDto, id: string): Promise<ISellerDocument>
    updatePassword(updatePasswordDto: UpdatePasswordDto, id: string): Promise<ISellerDocument>
    getSellers(): Promise<ISellerDocument[]>
}