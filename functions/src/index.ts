// import * as postmark from "postmark";
import { params } from "firebase-functions";
import * as functions from "firebase-functions/v2";
import Auth from "./services/Auth";
import Stripe from "./services/Stripe";
import Deeplink from "./services/Deeplink";

const environment = params.defineString('ENVIRONMENT', { default: 'dev' });

const httpOptions: functions.https.HttpsOptions = {
  memory: environment.equals('PRODUCTION').thenElse("8GiB", "1GiB").value(),
  concurrency: environment.equals('PRODUCTION').thenElse(500, 100).value(),
  cpu: environment.equals('PRODUCTION').thenElse(3, 0).value(),
  minInstances: environment.equals('PRODUCTION').thenElse(3, 0).value(),
}

//micro-services
exports.auth = functions.https.onRequest(httpOptions, Auth);
exports.stripe = functions.https.onRequest(httpOptions, Stripe);
exports.deeplink = functions.https.onRequest(httpOptions, Deeplink);