export class UserError extends Error {

    constructor(message:string){
        super(message);
        this.name = 'UserError';
        Object.setPrototypeOf(this,new.target.prototype);
    }

    static UserNotFound(): UserError {
        return new UserError("User not found");
    }

    static InvalidPasswordOrEmail(): UserError {
        return new UserError("Invalid Email or Password");
    }

    static userNameMismatch(): UserError{
        return new UserError("Mismatch UserName")
    }
    
    static EmailMismatch(): UserError{
        return new UserError("Mismatch Emails")
    }

    static PasswordMismatch(): UserError {
        return new UserError("Password Mismatch");
    }

    static OldPasswordIsInCorrect():UserError{
        return new UserError("Old password is incorrect")
    }

}