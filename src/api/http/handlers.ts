import { Request, Response } from "express";
import { AppError } from "./exceptions";

export const ApiHandler =
  (req: Request, res: Response) =>
  async (handler: (req: Request, res: Response) => Promise<any>) => {
    try {
      const result = await handler(req, res);
      res.json(result);
    } catch (error) {
      if (error instanceof AppError) {
        const appError = error as AppError;

        return res.status(appError.status).json({
          statusCode: appError.status,
          body: {
            error: appError.name,
            message: appError.message,
          },
        });
      }

      return res.status(500).json({
        statusCode: 500,
        body: {
          error: "Internal Server Error",
        },
      });
    }
  };
