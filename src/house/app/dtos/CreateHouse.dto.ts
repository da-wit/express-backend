import { IsNotEmpty, IsString } from "class-validator";

export class CreateHouseDto {
    @IsString()
    @IsNotEmpty()
    public housename: string;
    @IsString()
    @IsNotEmpty()
    public address: string;
    @IsString()
    @IsNotEmpty()
    public price: string;
    @IsString()
    @IsNotEmpty()
    public imagepath: string;

    constructor(housename: string, address: string, price: string, imagepath: string) {
        this.housename = housename
        this.address = address
        this.price = price
        this.imagepath = imagepath
    }
}