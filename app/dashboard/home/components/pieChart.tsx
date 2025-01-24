import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { useSchoolData } from "@/context/school";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart() {
  const { students } = useSchoolData();
  const maleStudents: any = students.filter(item => item.gender === "Male").length;
  const femaleStudents: any = students.filter(item => item.gender === "Female").length;
  const [data, setData] = useState<ChartData<"doughnut", number[], unknown>>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [50, 50],
        backgroundColor: ["#304FFE", "#40DFCD"],
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    if (students.length && (femaleStudents || maleStudents)) {
      const maleCountPercentage = (maleStudents / students.length) * 100;
      const femaleCountPercentage =
        (femaleStudents / students.length) * 100;
      setData({
        labels: [],
        datasets: [
          {
            label: "",
            data: [maleCountPercentage, femaleCountPercentage],
            backgroundColor: ["#304FFE", "#40DFCD"],
            borderWidth: 2,
          },
        ],
      });
    }
    if (!students.length && !femaleStudents && !maleStudents) {
      setData({
        labels: [],
        datasets: [
          {
            label: "",
            data: [100],
            backgroundColor: ["#808080"],
            borderWidth: 2,
          },
        ],
      });
    }
  }, [maleStudents, femaleStudents, students]);

  return (
    <Doughnut
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
      }}
    />
  );
}
