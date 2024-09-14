import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCompanynameDto {
    @IsString()
    @IsNotEmpty()
    public companyname: string;

    constructor(companyname: string) {
        this.companyname = companyname
    }
}