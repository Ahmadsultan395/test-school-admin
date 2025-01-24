import * as _ from "lodash";
import { Request, Response, NextFunction } from "express";
import { logger } from "firebase-functions";
import { IError } from "./interfaces/error";

// 400
export const INVALID_USER: IError = {
  code: 412,
  type: "Invalid User",
};
export const INVALID_ZIP_CODE: IError = {
  code: 415,
  type: "Invalid Zip Code",
};
export const INVALID_INPUT: IError = {
  code: 416,
  type: "Invalid",
};
export const REQUIRED_FIELD: IError = {
  code: 417,
  type: "Required Field",
};
export const INVALID_FIELD_LENGTH: IError = {
  code: 419,
  type: "Invalid field length",
};
export const INVALID_SERVICE_TYPE: IError = {
  code: 421,
  type: "Invalid Service Type",
};
export const RESOURCE_EXIST: IError = {
  code: 422,
  type: "Existing Resource",
};

//401
export const UNAUTHORIZED: IError = {
  code: 401,
  type: "Required auth token",
};
export const INVALID_TOKEN: IError = {
  code: 414,
  type: "Invalid Token",
};

//403
export const UNAUTHORIZED_ROLE: IError = {
  code: 403,
  type: "Not Authorized for Resource",
};

//404
export const NOT_FOUND: IError = {
  code: 404,
  type: "Not Found",
};

class ClientError extends Error implements IError {
  type: string;
  code: number;

  constructor({ code, type }: IError, resource?: string) {
    let message = type;
    if (resource) {
      message = `${_.capitalize(resource)} is ${type}.`;
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

export const NotFoundError = (resource: string) =>
  new ClientError(NOT_FOUND, resource);

export const InvalidInputError = (resource: string) =>
  new ClientError(INVALID_INPUT, resource);

export const InvalidZipCode = (resource: string) =>
  new ClientError(INVALID_ZIP_CODE, resource);

export const InvalidServiceTypeError = (resource: string) =>
  new ClientError(INVALID_SERVICE_TYPE, resource);

export const InvalidUserError = (resource: string) =>
  new ClientError(INVALID_USER, resource);

export const RequiredFieldError = (resource: string) =>
  new ClientError(REQUIRED_FIELD, resource);

export const InvalidFieldLengthError = (resource: string) =>
  new ClientError(INVALID_FIELD_LENGTH, resource);

export const UnauthorizedError = () => new ClientError(UNAUTHORIZED);

export const InvalidTokenError = () => new ClientError(INVALID_TOKEN);

export const UnauthorizedRoleError = (uid: string) =>
  new ClientError(UNAUTHORIZED_ROLE, `User #${uid}`);

export const ResourceExistError = (resource: string) =>
  new ClientError(RESOURCE_EXIST, resource);

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
