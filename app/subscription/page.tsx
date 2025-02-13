"use client";
import React, { useState, useEffect } from "react";
import styles from "./subcription.module.css";
import Image from "next/image";
import Switch from "react-switch";
import Icons from "../../Theme/Icons";
import Images from "../..//Theme/Images";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import Subcription from "@/Services/Subcription";
import { useAuthentication } from "../../context/auth";
import { convertCentsToDollars } from "../../Utils/utils";
import "react-toastify/dist/ReactToastify.css"; 

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

const SubscriptionPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [checked, setChecked] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { subscriptionItem, token, handleSubscription, handlePaymentMethode } =
    useAuthentication();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    if (token !== null) {
      const products = await Subcription.getProducts({ token });
      if (products.length > 0) {
        const sortProducts = sortProductsByAmountDescending(products);
        setProducts(sortProducts);
        setLoading(false);
      }
    }
  };

  const sortProductsByAmountDescending = (products: any) => {
    return products.sort(
      (a: any, b: any) => a?.priceData?.unit_amount - b?.priceData?.unit_amount
    );
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
      {subscriptionItem && (
        <div
          onClick={() => {
            if (subscriptionItem) {
              handleSubscription();
              router.push("/");
            }
          }}
        >
          <Image
            src={Icons.backArrowIcon}
            width={30}
            height={30}
            alt="Picture of the author"
            className={styles.backImage}
          />
        </div>
      )}

      <Image
        src={Images.SchoolLogo}
        width={280}
        height={67.82}
        alt="Picture of the author"
        className={styles.logoImage}
      />
      <div className={styles.choosePlanRow}>
        <div className={styles.leftRow}>
          <span className={styles.txtChoosePlan}>Choose your plan...!</span>
          <span className={styles.txtPlanDecription}>
            Get the right plan for your business. Plans can be upgraded in the
            future.
          </span>
        </div>
        <div className={styles.rightRow}>
          <span className={styles.txtBilledPlan}>Billed Monthly</span>
          <Switch
            onColor={"#8147E7"}
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={() => setChecked(!checked)}
            checked={checked}
          />
          <span className={styles.txtBilledPlan}>Billed Annually</span>
        </div>
      </div>
      <div className={styles.subcriptionContainer}>
        {products?.map((item, index) => (
          <div
            className={
              item?.id === subscriptionItem?.plan?.product
                ? styles.activeCard
                : styles.card
            }
            key={index}
          >
            {index === 2 ? (
              <div className={styles.paymentPlanRow}>
                <Image
                  width={40}
                  height={40}
                  alt="icon"
                  src={Images.PremiumImg}
                />
                <h4
                  className={
                    item?.id === subscriptionItem?.plan?.product
                      ? styles.activePaymenttHeader
                      : styles.paymentHeader
                  }
                >
                  {item?.name ? item?.name : ""}
                </h4>
              </div>
            ) : (
              <h4
                className={
                  item?.id === subscriptionItem?.plan?.product
                    ? styles.activePaymenttHeader
                    : styles.paymentHeader
                }
              >
                {item?.name ? item?.name : ""}
              </h4>
            )}
            <div
              className={
                item?.id === subscriptionItem?.plan?.product
                  ? styles.activeUnderLine
                  : styles.underLine
              }
            />

            <div className={styles.txtPaymentRow}>
              <h4
                className={
                  item?.id === subscriptionItem?.plan?.product
                    ? styles.activeTxtPayment
                    : styles.txtPayment
                }
              >
                {item?.priceData?.unit_amount
                  ? convertCentsToDollars(item?.priceData?.unit_amount)
                  : ""}
              </h4>
              <p
                className={
                  item?.id === subscriptionItem?.plan?.product
                    ? styles.activeTxtPaymentPeriod
                    : styles.txtPaymentPeriod
                }
              >
                /month
              </p>
            </div>
            {item?.features?.map((offItem, offIndex) => (
              <div className={styles.offers} key={offIndex}>
                <Image
                  width={20}
                  height={5}
                  alt="icon"
                  src={
                    item?.id === subscriptionItem?.plan?.product
                      ? Icons.whiteStarIcon
                      : Icons.themStarIcon
                  }
                />
                <p
                  className={
                    item?.id === subscriptionItem?.plan?.product
                      ? styles.activeTxtOffers
                      : styles.txtOffers
                  }
                >
                  {offItem?.name ? offItem?.name : ""}
                </p>
              </div>
            ))}
            <button
              onClick={() => {
                if (item?.id === subscriptionItem?.plan?.product) {
                  //
                } else {
                  handlePaymentMethode();
                  localStorage.setItem("productItem", JSON.stringify(item));
                  router.push("/payment");
                }
              }}
              className={
                index === 0
                  ? item?.id === subscriptionItem?.plan?.product
                    ? styles?.activeBtnStartPayment
                    : styles?.btnStartPayment
                  : index === 1
                  ? item?.id === subscriptionItem?.plan?.product
                    ? styles?.activeBtnSeconPayment
                    : styles?.btnSeconPayment
                  : item?.id === subscriptionItem?.plan?.product
                  ? styles?.activeBtnPayment
                  : styles?.btnPayment
              }
            >
              {item?.id === subscriptionItem?.plan?.product
                ? "Subscribed"
                : "Buy Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
