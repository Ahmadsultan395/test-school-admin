import cors = require("cors")
import express = require("express")
import * as Stripe from "./Stripe";
import { ensureApiAuthenticated } from "../../middleware/auth";

const StripeRouter = express();
StripeRouter.use(cors());

StripeRouter.route("/webhook").post(Stripe.webhook);
StripeRouter.route("/getSubcription").get(Stripe.getSubcription);

StripeRouter.use(ensureApiAuthenticated);

StripeRouter.route("/checkout").post(Stripe.checkout);
StripeRouter.route("/getProducts").get(Stripe.getProducts);
StripeRouter.route("/subscribeInit").post(Stripe.subscribeInit);

export default StripeRouter;
