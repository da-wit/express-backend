export class UserError extends Error {

    constructor(message: string) {
        super(message);
        this.name = 'UserError';
        Object.setPrototypeOf(this, new.target.prototype);
    }

    static InvalidCredential(): UserError {
        return new UserError("InvalidCredential")
    }

    static UserNotFound(): UserError {
        return new UserError("User not found");
    }

    static InvalidPasswordOrEmail(): UserError {
        return new UserError("Invalid Email or Password");
    }

    static userNameMismatch(): UserError {
        return new UserError("Mismatch UserName")
    }

    static EmailMismatch(): UserError {
        return new UserError("Mismatch Emails")
    }

    static PasswordMismatch(): UserError {
        return new UserError("Password Mismatch");
    }

    static OldPasswordIsInCorrect(): UserError {
        return new UserError("Old password is incorrect")
    }

    static EmailAlreadyExists(): UserError {
        return new UserError("Email already exists")
    }

    static UserNameAlreadyExists(): UserError {
        return new UserError("User name already exists")
    }

}