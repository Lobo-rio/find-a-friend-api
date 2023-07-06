export class OrgsAlreadyExistsError extends Error {
    constructor() {
        super('E-mail/Celular elready exists!')
    }
}