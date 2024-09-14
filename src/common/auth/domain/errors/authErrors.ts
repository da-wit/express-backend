export class AuthError extends Error {
    constructor(message: string) {
        super(message),
            this.name = "AuthErrors";
        Object.setPrototypeOf(this, new.target.prototype)
    }

    static InvalidCredential(): AuthError {
        return new AuthError(" Invalid Credential")
    }

    static InvalidRole(): AuthError {
        return new AuthError(" Invalid Role")
    }
}