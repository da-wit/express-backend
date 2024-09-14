export class SellerError extends Error {

    constructor(message: string) {
        super(message);
        this.name = "SellerError";
        Object.setPrototypeOf(this, new.target.prototype)
    }

    static InvalidCredential(): SellerError {
        return new SellerError(" InvalidCredential")
    }
    static InvalidEmail(): SellerError {
        return new SellerError("Invalid Email")
    }
    static InvalidPassword(): SellerError {
        return new SellerError("Invalid Password");
    }

    static SellerNotfound(): SellerError {
        return new SellerError("Seller not found");
    }


    static PasswordMismatched(): SellerError {
        return new SellerError("Password Mismatched");
    }

    static EmailAlreadyExists(): SellerError {
        return new SellerError("Email already exists");
    }

    static UserNameAlreadyExists(): SellerError {
        return new SellerError("User name already exists");
    }
}