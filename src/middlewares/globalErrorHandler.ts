import { NextFunction, Request, Response } from "express";

const globalErrorHandlers = (error : any, req: Request, res: Response, next: NextFunction) => {
    const status =error?.statusCode || 500;
    const message = error?.message || "Something went wrong!"
    res.status(status).json({
        success: true,
        message: message,
        error,
    })
    return;
}

export default globalErrorHandlers;