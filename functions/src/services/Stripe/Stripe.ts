
import * as _ from "lodash";
import { Response } from "express";
import { logger } from "firebase-functions";
import * as Stripe from "../../utils/stripe";

export async function checkout(req: any, res: Response) {
  const { user } = req.body;
  try {
    if (!req.body || !user || !req.body.price) throw Error('Invalid Body Params')

    const response = await Stripe.checkout(user, req.body.price);

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


export async function subscribeInit(req: any, res: Response) {
  const { priceId, customerId } = req.body;
  try {
    if (!req.body || !priceId || !customerId) throw Error('Invalid Body Params')

    const user = (req as any).userInfo;

    const response = await Stripe.subscribeInit(priceId, customerId, user);

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


export async function getProducts(req: any, res: Response) {
  try {

    const response = await Stripe.getProducts()

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

export async function getSubcription(req: any, res: Response) {
  try {

    const {subscription_id} = req.body;

    if (!req.body || !subscription_id) throw Error('Subscription Id does not exist!')

    const response = await Stripe.getSubcription(subscription_id);

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


export async function webhook(req: any, res: Response) {
  const event = req.body;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    case 'invoice.payment_succeeded':
      event.data.object;
      Stripe.setCustomerSubcription(event);
      console.log('Payment Succeeded!');
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};



