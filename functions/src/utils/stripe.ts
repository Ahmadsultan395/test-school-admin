
import * as _ from "lodash";
import Stripe from 'stripe';
import { auth, db } from "./admin";
import { logger } from "firebase-functions";

const apiKey = 'sk_test_51OcosDH3CB3DovoFTJ4Rn9iTCjl3Bi74dMhYgCc2P4TGyS4a6O4CVAeyFo0stgu8uWUlTajfbRiyZoKUfr6Q9L8e00DmnYpj7w';
const publishableKey = 'pk_test_51OcosDH3CB3DovoFumSP0NT0Hq3dhZJrzKuHc9EMlzOu5rgMp2nFKdlsJXoFINXtwfNptPUvoDHKeMu2lH3g3od100cWXmS2n2';

const stripe = new Stripe(apiKey, {
	apiVersion: '2023-10-16',
});

const adminRef = db.collection("Admins");

interface CheckoutResponse {
	paymentIntentObj: Stripe.Response<Stripe.PaymentIntent>,
	paymentIntent: string | null,
	ephemeralKey?: string,
	customer: string,
	publishableKey: string,
}

export async function checkout(user: any, price: any): Promise<CheckoutResponse> {
	if (!user || !price) throw Error('Invalid Body Params')

	const platformCustomer = await getPlatformCustomer(user);

	if (!platformCustomer) throw new Error('Customer doesnt exist')

	const totalAmount = Number(price);

	// Connected account intent
	const payIntentObject: Stripe.PaymentIntentCreateParams = {
		amount: totalAmount,
		currency: 'usd',
		payment_method_types: ['card'],
		customer: platformCustomer.id,
	}

	const paymentIntent = await stripe.paymentIntents.create(payIntentObject);

	logger.info({ paymentIntent, requestBodyAmount: Number(price) }, 'Payment Intent Created');

	const ephemeralKey = await stripe.ephemeralKeys.create(
		{ customer: platformCustomer.id },
		{ apiVersion: '2020-08-27' }
	);

	return {
		paymentIntentObj: paymentIntent,
		paymentIntent: paymentIntent.client_secret,
		ephemeralKey: ephemeralKey.secret,
		customer: platformCustomer.id,
		publishableKey: publishableKey,
	}
};

export async function subscribeInit(priceId: string, customerId: string, user: any) {

	const setupIntent = await stripe.setupIntents.create({});

	const subscription = await stripe.subscriptions.create({
		trial_period_days: 14,
		customer: customerId,
		items: [{
			price: priceId,
		}],
		payment_behavior: 'default_incomplete',
		payment_settings: { save_default_payment_method: 'on_subscription' },
		expand: ['latest_invoice.payment_intent'],
	});

	let client_secret = null;
	let isSetupIntent = false;

	if (subscription?.latest_invoice && typeof (subscription?.latest_invoice) !== "string" && typeof (subscription?.latest_invoice?.payment_intent) !== "string" && subscription?.latest_invoice?.payment_intent?.client_secret) {
		client_secret = subscription?.latest_invoice?.payment_intent?.client_secret;
	} else {
		client_secret = setupIntent.client_secret;
		isSetupIntent = true;
	}

	return {
		subscriptionId: subscription.id,
		clientSecret: client_secret,
		isSetupIntent,
		subscription
	};
};

export const getPlatformCustomer = async (user: any): Promise<Stripe.Customer | null> => {

	let customerID = !!user && !!user?.customer_id ? user?.customer_id : null;

	if (!customerID) {
		const stripeCustomer = await stripe.customers.create({
			email: user?.email,
			name: user?.adminName,
			phone: user?.contact1
		});
		const customer_id = stripeCustomer.id;

		const customer = {
			...stripeCustomer,
			customer_id
		}

		return customer;
	}

	const customer = await stripe.customers.retrieve(customerID);

	return customer && !customer?.deleted ? customer : null;
}

export const getProducts = async () => {
	const products = await stripe.products.list();
	const prices = await stripe.prices.list();

	return products.data.map((productItem) => {
		const priceData = prices.data.find((priceItem) => priceItem.product === productItem.id)

		return {
			...productItem,
			priceData
		}
	});

}

export const getSubcription = async (subscription_id: any) => {
	const subscriptions = await stripe.subscriptions.list();

	const subscription = subscriptions.data.find((subItem) => subItem?.id === subscription_id);

	return subscription;
}


export const setCustomerSubcription = async (event: Stripe.Event) => {
	if (event.type === "invoice.payment_succeeded") {
		const customer_id = event.data.object.customer;
		const subscription_id = event?.data?.object?.subscription;

		const adminQuery = await adminRef.where("customer_id", "==", customer_id).get();

		if (adminQuery.empty) {
			console.log("Customer does not exist!");
			return;
		}

		const admin = adminQuery.docs[0].data();
		const subcription = await getSubcription(subscription_id);

		let subscription = {
			subscription_id: subcription?.id,
			created: subcription?.created,
			current_period_end: subcription?.current_period_end,
			current_period_start: subcription?.current_period_start,
			customer: subcription?.customer,
			plan: subcription?.items?.data[0]?.plan
		}

		const adminUID = admin?.uid;
		const claims = {
			...admin,
			subscription
		};

		// Generate a custom token for the UID
		await auth.setCustomUserClaims(adminUID, claims);
	}
}

