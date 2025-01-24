import qs from "qs";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "./../Utils/firebase";
import { signInWithCustomToken } from "firebase/auth";

//Todo: get base url for user auth service and store in env variable
const AuthInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL  // http request are blocked on ios and therefore https is needed. To bypass this for now please hard code your IP address when testing locally.
});

AuthInstance.interceptors.response.use(
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


async function signInWithAdmin({ email, password }: { email: string, password: string }) {
    const data = qs.stringify({
        email,
        password
    });

    const response = await AuthInstance.post('/adminSignIn', data);

    if (response?.data?.customToken !== undefined) {
        let token = response?.data?.customToken
        signInWithCustomToken(auth, token)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

}

async function signUpWithAdmin({ email, password, schoolData }: { email: string, password: string, schoolData: object }) {
    const data = qs.stringify({
        ...schoolData,
        email,
        password
    });

    const response = await AuthInstance.post('/adminSignup', data);

    if (response?.data?.customToken !== undefined) {
        let token = response?.data?.customToken
        signInWithCustomToken(auth, token)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                console.log(error.message)
            });
    }
}

async function signOut() {
    const response = await auth.signOut();

    return response;
}

export default {
    signOut,
    signInWithAdmin,
    signUpWithAdmin,
};
