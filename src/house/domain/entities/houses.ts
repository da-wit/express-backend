export class Houses {
    private housename: string;
    private address: string;
    private price: string;
    private imagepath: string;
    private sellerId: string;

    constructor(housename: string, address: string, price: string, imagepath: string, seller: string) {
        this.housename = housename;
        this.address = address;
        this.price = price;
        this.imagepath = imagepath;
        this.sellerId = seller
    }

    getHouseName() {
        return this.housename;
    }

    getAddres() {
        return this.address;
    }

    getPrice() {
        return this.price;
    }

    getImagePath() {
        this.imagepath;
    }

    getSeller() {
        return this.sellerId;
    }
}