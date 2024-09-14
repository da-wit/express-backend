import { serviceContainer } from "../../../common/core/serviceContainer";
import { ISellerDocument } from "../../domain/repository/ISellerDocument";
import { sellerServiceContainer } from "../../infrastructure/services/sellerServiceContainer";
import { CreateSellerCommand } from "../command/CreateSellerCommand";
import { UpdateCompanynameCommand } from "../command/UpdateCompanynameCommand";
import { UpdateEmailCommand } from "../command/UpdateEmailCommand";
import { UpdatePasswordCommand } from "../command/UpdatePasswordCommand";
import { UpdateUserNameCommand } from "../command/UpdateUsernameCommand";
import { CreateSellerDto } from "../dtos/CreateSeller.dto";
import { UpdateCompanynameDto } from "../dtos/UpdateCompanyname.dto";
import { UpdateEmailDto } from "../dtos/updateEmail.dto";
import { UpdatePasswordDto } from "../dtos/UpdatePassword.dto";
import { UpdateUsernameDto } from "../dtos/UpdateUsername.dto";
import { ISellerService } from "../interfaces/ISellerService";
import { GetSellersQuery } from "../queries/GetSellersQuery";

export class SellerServices implements ISellerService {
    createSeller(sellerData: CreateSellerDto): Promise<ISellerDocument> {
        const command = new CreateSellerCommand(sellerServiceContainer.sellerRepo, serviceContainer.encryptionService, sellerData);

        return command.execute();
    }

    updateCompanyName(companyname: UpdateCompanynameDto, id: string): Promise<ISellerDocument> {
        const command = new UpdateCompanynameCommand(sellerServiceContainer.sellerRepo, companyname, id)

        return command.execute()
    }

    updateEmail(email: UpdateEmailDto, id: string): Promise<ISellerDocument> {
        const command = new UpdateEmailCommand(sellerServiceContainer.sellerRepo, email, id);

        return command.execute();
    }

    updateUserName(username: UpdateUsernameDto, id: string): Promise<ISellerDocument> {
        const command = new UpdateUserNameCommand(sellerServiceContainer.sellerRepo, username, id);

        return command.execure();
    }

    updatePassword(updatePasswordDto: UpdatePasswordDto, id: string): Promise<ISellerDocument> {
        const command = new UpdatePasswordCommand(sellerServiceContainer.sellerRepo, serviceContainer.encryptionService, updatePasswordDto, id);

        return command.execute();
    }

    getSellers(): Promise<ISellerDocument[]> {
        const query = new GetSellersQuery(sellerServiceContainer.sellerRepo);

        return query.execute();
    }
}