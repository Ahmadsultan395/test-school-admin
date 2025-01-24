import cors = require("cors")
import express = require("express")
import * as Deeplink from "./Deeplink";
import { ensureApiAuthenticated } from "../../middleware/auth";

const DeeplinkRouter = express();
DeeplinkRouter.use(cors());

DeeplinkRouter.route("/createDeeplink").post(Deeplink.createDeeplink);

DeeplinkRouter.use(ensureApiAuthenticated);

export default DeeplinkRouter;