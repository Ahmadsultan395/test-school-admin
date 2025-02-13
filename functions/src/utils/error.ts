import { capitalize } from "lodash";
import { Request, Response, NextFunction } from "express";
import { logger } from "firebase-functions";

export interface IError {
  type: string;
  code: number;
}

export const INVALID_INPUT: IError = {
  code: 416,
  type: "Invalid",
};

export class ClientError extends Error implements IError {
  type: string;
  code: number;

  constructor({ code, type }: IError, resource?: string) {
    let message = type;
    if (resource) {
      message = `${capitalize(resource)} is ${type}.`;
    }

    super(message);
    this.code = code;
    this.type = type;
  }

  getResponse() {
    const { code, type, message } = this;

    return {
      code,
      type,
      message,
    };
  }
}

export const InvalidInputError = (resource?: string | undefined) =>
  new ClientError(INVALID_INPUT, resource);


function errorhandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type) {
    if (
      error.code === 412 ||
      error.code === 415 ||
      error.code === 416 ||
      error.code === 417 ||
      error.code === 419 ||
      error.code === 421 ||
      error.code === 422
    ) {
      return res.status(400).json(error.getResponse());
    } else if (error.code === 401 || error.code === 414) {
      return res.status(401).json(error.getResponse());
    } else {
      const { code } = error.getResponse();
      return res.status(code).json(error.getResponse());
    }
  }

  // Display in error logs
  logger.error(error);

  return res.sendStatus(500);
}

export default errorhandler;
