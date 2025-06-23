
class AppError extends Error {
    constructor(status , message) {
        this.status = status;
        super(message);
        Error.captureStackTrace(this , this.constructor)
    }
}


export default AppError;