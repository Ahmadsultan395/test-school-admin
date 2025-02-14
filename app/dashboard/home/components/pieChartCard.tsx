import Image from "next/image";
import { PieChart } from "./pieChart";
import styles from "./styles.module.css";
import Icons from "../../../../Theme/Icons";
import Link from "next/link";
import { useSchoolData } from "../../../../context/school";
import { useEffect } from "react";

interface Student {
  gender: "Male" | "Female";
}

const PieChartCard = () => {
  const { students } = useSchoolData();
  const maleStudents : number = students.filter((item:Student) => item.gender === "Male").length;
  const femaleStudents : number = students.filter((item:Student) => item.gender === "Female").length;

  return (
    <div className={styles.doughnutChart}>
      <div className={styles.chartRow}>
        <span className={styles.txtExpenses}>Students</span>
        <div className={styles.moreIconCircle}>
          <Link href={"/dashboard/students"}>
            <Image
              src={Icons.MoreIcon}
              alt=""
              height={24}
              width={24}
              quality={100}
              className={styles.moreIcon}
            />
          </Link>
        </div>
      </div>
      <PieChart />
      <div className={styles.schoolInfo}>
        <span className={styles.txtTotlaStudent}>Total Students</span>
        <span className={styles.totalStudent}>
          {maleStudents + femaleStudents}
        </span>
      </div>
      <div className={styles.barChartRow}>
        <div className={styles.pieChartInfo}>
          <span className={styles.txtMonthYear}>Male</span>
          <span className={styles.txtMonthAmount}>{maleStudents}</span>
          <div className={styles.lightBlueProgress} />
        </div>
        <div className={styles.pieChartInfo}>
          <span className={styles.txtMonthYear}>Female</span>
          <span className={styles.txtMonthAmount}>{femaleStudents}</span>
          <div className={styles.lightGreenProgress} />
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
