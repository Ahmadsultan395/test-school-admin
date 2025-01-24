// pages/index.js
"use client";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import styles from "./pageMethod.module.css";
import Image from "next/image";
import Icons from "../../Theme/Icons";
import Images from "../../Theme/Images";
import CheckoutForm from "./checkoutForm";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { Elements } from "@stripe/react-stripe-js";
import Subcription from "../..//Services/Subcription";
import { useAuthentication } from "../../context/auth";
import { convertCentsToDollars } from "../../Utils/utils";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OcosDH3CB3DovoFumSP0NT0Hq3dhZJrzKuHc9EMlzOu5rgMp2nFKdlsJXoFINXtwfNptPUvoDHKeMu2lH3g3od100cWXmS2n2"
);

interface SubscribeInitResponse {
  subscriptionId: string | null;
  clientSecret: string | null;
  isSetupIntent: boolean;
  subscription: object | null;
}

interface ProductItem {
  active: boolean;
  attributes: any[];
  created: number;
  default_price: string;
  description: null | string;
  features: { name: string }[];
  id: string;
  images: any[];
  livemode: boolean;
  metadata: Record<string, any>;
  name: string;
  object: string;
  package_dimensions: null | {
    /* Define the structure of package_dimensions object here */
  };
  priceData: {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: null | number;
    livemode: boolean;
    lookup_key: null | string;
    metadata: Record<string, any>;
    nickname: null | string;
    product: string;
    recurring: {
      aggregate_usage: null | string;
      interval: string;
      interval_count: number;
      trial_period_days: null | number;
      usage_type: string;
    };
    tax_behavior: string;
    tiers_mode: null | string;
    transform_quantity: null | string;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
    // Add other properties of priceData object here
  };
  shippable: null | any;
  statement_descriptor: null | string;
  tax_code: string;
  type: string;
  unit_label: null | string;
  updated: number;
  url: null | string;
}

const PaymentMethod = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [productItem, setProductItem] = useState<ProductItem | null>(null);
  const { token, admin, handlePaymentMethode } = useAuthentication();
  const [subscribeInitResponse, setSubscribeInitResponse] =
    useState<SubscribeInitResponse | null>(null);
  let options: StripeElementsOptions | undefined;

  if (subscribeInitResponse?.clientSecret !== null) {
    options = {
      // passing the client secret obtained from the server
      clientSecret: `${subscribeInitResponse?.clientSecret}`,
    };
  }

  useEffect(() => {
    async function handleProductData() {
      const productItem = await localStorage.getItem("productItem");
      if (productItem !== null) {
        const item = JSON.parse(productItem);
        setProductItem(item);
        initializeSubscription(item);
      }
    }
    handleProductData();
  }, []);

  const initializeSubscription = async (productItem: any) => {
    if (productItem !== undefined) {
      const priceId = productItem?.priceData?.id;
      const customerId = (admin as { customer_id: string })?.customer_id;
      const safeToken = token || "";
      const response = await Subcription.subscribeInit({
        priceId,
        customerId,
        token: safeToken,
      });
      setSubscribeInitResponse(response);
      setLoading(false);
    }
  };

  const handleNavigationBack = () => {
    setProductItem(null);
    handlePaymentMethode();
    router.push("/subscription");
  };

  if (isLoading) {
    return (
      <div className={styles.loadContainer}>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#8147e7"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        {/* Logo and Details */}
        <div className={styles.logoContainer}></div>
        <Image
          src={Images.splashLogo}
          width={280}
          height={67.82}
          alt="Picture of the author"
          className={styles.logoImage}
        />
        <div className={styles.paymentDetails}>
          <span className={styles.txtOrderSummary}>Order Summary</span>
          <button
            className={styles.btnChangePlan}
            onClick={() => handleNavigationBack()}
          >
            Change Plan
          </button>
        </div>
        <div className={styles.planRow}>
          <div className={styles.paymentPlanRow}>
            <Image width={40} height={40} alt="icon" src={Images.PremiumImg} />
            <h4 className={styles.paymentHeader}>
              {productItem?.name ? productItem?.name : ""}
            </h4>
          </div>
          <div className={styles.txtPaymentRow}>
            <h4 className={styles.txtPayment}>
              {productItem?.priceData?.unit_amount
                ? `$${convertCentsToDollars(
                    productItem?.priceData?.unit_amount
                  )}`
                : ""}
            </h4>
            <p className={styles.txtPaymentPeriod}>/month</p>
          </div>
        </div>
        <div className={styles.offerRow}>
          {productItem?.features?.slice(0, 2).map((offItem, offIndex) => (
            <div className={styles.offers} key={offIndex}>
              <Image
                width={18}
                height={5}
                alt="icon"
                src={Icons.themStarIcon}
              />
              <p className={styles.txtOffers}>
                {offItem?.name ? offItem?.name : ""}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.offerRow}>
          {productItem?.features?.slice(2, 5).map((offItem, offIndex) => (
            <div className={styles.offers} key={offIndex}>
              <Image
                width={18}
                height={5}
                alt="icon"
                src={Icons.themStarIcon}
              />
              <p className={styles.txtOffers}>
                {offItem?.name ? offItem?.name : ""}
              </p>
            </div>
          ))}
        </div>
        <Image
          src={Images.PaymentImg}
          width={500}
          height={500}
          alt="Picture of the author"
          className={styles.paymentImg}
        />
      </div>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <div>
          <div
            className={styles.helloWave}
            onClick={() => handleNavigationBack()}
          >
            <Image
              src={Icons.backArrowIcon}
              width={24}
              height={24}
              alt="Picture of the author"
              className={styles.backImage}
            />
            Payment Details
          </div>
        </div>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm isSetupIntent={subscribeInitResponse?.isSetupIntent} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentMethod;
