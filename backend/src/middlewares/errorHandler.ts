import { Request, Response, NextFunction } from "express";

interface IError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
