
import * as _ from "lodash";
import { Response } from "express";
import { logger } from "firebase-functions";
import * as Deeplink from "../../utils/deeplink";

export async function createDeeplink(req: any, res: Response) {
  try {
    const { name, email, role, path, school_id } = req.body;
    if (!name || !email || !role || !path || !school_id) throw Error('Invalid Body Params')

    const response = await Deeplink.createDeeplink(name, email, role, path, school_id);

    return res.status(200).send({ response });

  } catch (err) {
    const error = err as Error;
    logger.error(err);
    return res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};