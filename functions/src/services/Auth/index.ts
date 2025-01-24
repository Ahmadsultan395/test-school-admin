import * as cors from "cors";
import * as express from "express";
import { logger } from "firebase-functions";
import errorhandler from "../../utils/error";

import * as Auth from "./Auth";

const AuthRouter = express();
AuthRouter.use(cors());
AuthRouter.use(express.urlencoded({ extended: false }));
AuthRouter.use(express.json());
AuthRouter.use(requestLogger);

AuthRouter.route("/adminSignIn").post(Auth.adminSignIn);
AuthRouter.route("/adminSignup").post(Auth.adminSignup);

AuthRouter.use("*", notFound);
AuthRouter.use(errorhandler);

function notFound(req: express.Request, res: express.Response) {
  res.status(404).json({ message: "Not Found" });
}

function requestLogger(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  logger.info({
    "Request IP": req.ip,
    "Request headers": req.header,
    "Request URL": req.baseUrl,
    "Request QUERY": req.query,
    "Request BODY": req.body,
  });
  next();
}

export default AuthRouter;
