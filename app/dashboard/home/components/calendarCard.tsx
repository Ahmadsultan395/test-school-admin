import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";
import Image from "next/image";
import Calendar from "react-calendar";
import styles from "./styles.module.css";
import Icons from "../../../../Theme/Icons";

const CalendarCard = (props: any) => {
  const [value, setValue] = useState<Date | null>(null); // Define state with null as initial value

  return (
    <div className={styles.infoCard}>
      <div className={styles.calendarRow}>
        <span className={styles.txtCalendar}>Calendar</span>
        <div className={styles.plusBtn}>
          <Image
            src={Icons.PlusIcon}
            width={11.25}
            height={11.25}
            alt=""
            quality={100}
          />
        </div>
      </div>
      <Calendar value={value} />
    </div>
  );
};

export default CalendarCard;
