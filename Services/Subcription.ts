import qs from "qs";
import axios from "axios";
import { toast } from "react-toastify";

//Todo: get base url for user auth service and store in env variable
const SubscriptionInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRIPE_API_URL  // http request are blocked on ios and therefore https is needed. To bypass this for now please hard code your IP address when testing locally.
});

SubscriptionInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status >= 500) {
            throw new Error(
                `We're experiencing an issue with our servers. Please try again later.`
            );
        }
        if (err.response?.status >= 400) {
            toast.error(err.response.data.message);
            const { message } = err.response.data.results;
            throw new Error(message);
        }
        throw err;
    }
);


async function subscribeInit({ priceId, customerId, token }: { priceId: string, customerId: string, token: string }) {
    const data = qs.stringify({
        priceId,
        customerId
    });

    const response = await SubscriptionInstance.post('/subscribeInit', data, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    if (response?.data?.response !== undefined) {
        return response?.data?.response;
    }
}



async function getProducts({ token }: { token: string }) {
    const response = await SubscriptionInstance.get('/getProducts', {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    return response?.data?.response;
}

export default {
    subscribeInit,
    getProducts,
};
