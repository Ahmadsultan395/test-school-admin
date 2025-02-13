import qs from "qs";
import axios from "axios";
import { toast } from "react-toastify";

const DeeplinkInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DEEPLINK_API_URL
});

DeeplinkInstance.interceptors.response.use(
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


async function createDeeplink({ email, name, role, path, school_id }: { email: string, name: string, role: string, path: string, school_id: string }) {
    const data = qs.stringify({
        email,
        name,
        role,
        path,
        school_id,
    });

    const response = await DeeplinkInstance.post('/createDeeplink', data);

    if (response?.data?.response !== undefined) {
        toast.success("Invitation Sent Successfully");
        return response?.data?.response;
    }
}


export default {
    createDeeplink,
};
