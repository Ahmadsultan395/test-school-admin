"use client";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import Auth from "../Services/Auth";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "./../Utils/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface AdminInterface {
  adminUID: string;
  aud: string;
  auth_time: number;
  avatarUrl: string | null;
  createdDate: string;
  customer_id: string;
  school_id: string;
  email: string;
  emailVerified: boolean;
  email_verified: boolean;
  exp: number;
  firebase: {
    identities: {
      email: string[];
      phone: string[];
    };
    sign_in_provider: string;
  };
  iat: number;
  iss: string;
  lastUpdated: string;
  name: string;
  phoneNumber: string;
  phone_number: string;
  role: string;
  sub: string;
  subscription: {
    created: number;
    current_period_end: number;
    current_period_start: number;
    customer: string;
    plan: {
      active: boolean;
      aggregate_usage: null;
      amount: number;
      amount_decimal: string;
      billing_scheme: string;
      created: number;
      currency: string;
      id: string;
      interval: string;
      interval_count: number;
      livemode: boolean;
      metadata: any;
      nickname: string | null;
      object: string;
      product: string;
      tiers_mode: null;
      transform_usage: null;
      trial_period_days: null;
      usage_type: string;
    };
    subscription_id: string;
  };
  uid: string;
  user_id: string;
}

interface SubscriptionItem {
  created: number;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  plan: {
    active: boolean;
    aggregate_usage: string | null;
    amount: number;
    amount_decimal: string;
    billing_scheme: string;
    created: number;
    currency: string;
    id: string;
    interval: string;
    interval_count: number;
    livemode: boolean;
    metadata: Record<string, any>;
    nickname: null | string;
    object: string;
    product: string;
    tiers_mode: null | string;
    transform_usage: null | string;
    trial_period_days: null | number;
    usage_type: string;
  };
  subscription_id: string;
}

interface ContextProps {
  admin: AdminInterface | null;
  loading: boolean;
  subscription: boolean;
  payment: boolean;
  token: string | null;
  subscriptionItem: SubscriptionItem | null;
  uploadImageToStorage: (file: string, imageId: any) => void;
  adminSignIn: (email: string, password: string) => void;
  adminSignup: (email: string, password: string, schoolData?: any) => void;
  adminSignOut: () => Promise<void>;
  handleSubscription: () => Promise<void>;
  handlePaymentMethode: () => Promise<void>;
}
const AuthenticationContext = createContext<ContextProps | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}: any) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(false);
  const [admin, setAdmin] = useState<AdminInterface | null>(null);
  const [subscription, setSubscription] = useState(false);
  const [subscriptionItem, setSubscriptionItem] =
  useState<SubscriptionItem | null>(null);

  // useProtectedRoute(admin);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      user
        ?.getIdTokenResult(true)
        .then((response: any) => {
          setToken(response?.token);
          setAdmin(response?.claims);
          setSubscriptionItem(response?.claims?.subscription);
        })
        .catch((error) => {
          setAdmin(null);
        });
    });
    return unsubscribe;
  }, []);

  const adminSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await Auth.signInWithAdmin({ email, password });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const uploadImageToStorage = async (file: any, imageId: any) => {
    const storage = getStorage();
    const storageRef = ref(storage, `folderName/${imageId}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image to storage:", error);
      throw error;
    }
  };

  const adminSignup = async (
    email: string,
    password: string,
    schoolData: any
  ) => {
    try {
      setLoading(true);
      await Auth.signUpWithAdmin({ email, password, schoolData });
      setLoading(false);
      // handleSubscription();
    } catch (error: any) {
      setLoading(false);
    }
  };

  const adminSignOut = async () => {
    try {
      setLoading(true);
      await Auth.signOut();
      setLoading(false);
      setAdmin(null);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const handleSubscription: () => Promise<void> = async () => {
    setSubscription(!subscription);
  };

  const handlePaymentMethode: () => Promise<void> = async () => {
    setPayment(!payment);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        admin,
        loading,
        subscription,
        payment,
        token,
        subscriptionItem,
        adminSignIn,
        adminSignup,
        uploadImageToStorage,
        adminSignOut,
        handleSubscription,
        handlePaymentMethode,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export function useAuthentication(): ContextProps {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("useAuthentication must be used within an AuthProvider");
  }
  return context;
}

function useProtectedRoute(admin: object | null) {
  const router = useRouter();

  useEffect(() => {
    if (admin) {
      router.replace("/");
    } else {
      router.replace("/auth/login");
    }
  }, [admin]);
}
