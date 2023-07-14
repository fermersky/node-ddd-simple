import { Request, Response } from "express";
import { AppError } from "./errors";
import { z } from "zod";

const TryCatchErrors = async (req: Request, res: Response, cb: any) => {
  try {
    await cb();
  } catch (error) {
    console.log(error);

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

const ApiHandlerOptionsSchema = z.object({
  logging: z.boolean().optional().default(false),
  logger: z.any().optional().default(console),
});

type ApiHandlerOptions = z.infer<typeof ApiHandlerOptionsSchema>;

export const ApiHandler =
  (
    req: Request,
    res: Response,
    options: ApiHandlerOptions = { logging: false, logger: console }
  ) =>
  async (handler: (req: Request, res: Response) => Promise<any>) => {
    await TryCatchErrors(req, res, async () => {
      const { logging, logger } = await ApiHandlerOptionsSchema.parseAsync(
        options
      );

      logging &&
        logger.log(
          `HTTP => ${new Date().toTimeString()} ${req.method} ${req.path}`
        );

      const result = await handler(req, res);

      logging && logger.log(`HTTP <= ${new Date().toTimeString()} took 5 sec`);

      res.json(result);
    });
  };
