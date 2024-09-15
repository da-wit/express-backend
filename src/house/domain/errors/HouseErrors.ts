export class HouseErrors extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'HouseErrors'
        Object.setPrototypeOf(this, new.target.prototype)
    }

    static HouseNotFound(): HouseErrors {
        return new HouseErrors("House not found")
    }

    static FileNotUploaded(): HouseErrors {
        return new HouseErrors("No file uploaded.")
    }



}