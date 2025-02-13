"use client";
import React, { useEffect } from "react";
import Images from "../Theme/Images";
import PaymentMethod from "./payment/page";
import { useSchoolData } from "../context/school";
import { useSearchParams } from "next/navigation";
import PageHeader from "../Components/pageHeader";
import { useAuthentication } from "../context/auth";
import SubscriptionPage from "./subscription/page";
import styles from "./dashboard/home/home.module.css";
import { ToastContainer, toast } from "react-toastify";
import StaffCard from "./dashboard/home/components/staffCard";
import DefaultCard from "./dashboard/home/components/defaultCard";
import BarChartCard from "./dashboard/home/components/barChartCard";
import PieChartCard from "./dashboard/home/components/pieChartCard";
import CalendarCard from "./dashboard/home/components/calendarCard";
import LineChartCard from "./dashboard/home/components/lineChartCard";
import DashboardCard from "./dashboard/home/components/dashboardCard";

export default function HomePage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const { subscription, payment } = useAuthentication();
  const { students, guardians, teachers, staff } = useSchoolData();

  useEffect(() => {
    if (success === "paid") {
      toast.success("You successfully purchased!");
    }
  }, [success]);

  return (
    <>
      {!subscription || !payment ? (
        <>
          <PageHeader headerText={`Admin Dashboard`} screenName={`Admin`} />
          <div className={styles.cardRow}>
            <DashboardCard
              count={students.length}
              cardType={"Students"}
              Image={Images.TotalStudentImg}
            />
            <DashboardCard
              count={teachers.length}
              cardType={"Teachers"}
              Image={Images.TotalTeacherImg}
            />
            <DashboardCard
              count={staff.length}
              cardType={"Staffs"}
              Image={Images.TotalStaffImg}
            />
            <DashboardCard
              count={guardians.length}
              cardType={"Guardians"}
              Image={Images.TotalGuardiansImg}
            />
          </div>
          <div className={styles.cardRow}>
            <LineChartCard />
            <BarChartCard />
            <PieChartCard />
          </div>
          <div className={styles.cardRow}>
            <CalendarCard />
            <StaffCard />
            <DefaultCard />
          </div>
        </>
      ) : subscription ? (
        <SubscriptionPage />
      ) : (
        <PaymentMethod />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
