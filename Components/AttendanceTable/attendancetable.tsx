// TableComponent.js
"use client";
import React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Image from "next/image";
import Icons from "../../Theme/Icons";

import style from "./attendancetable.module.css";

interface AttendanceRecord {
  status: string;
  date: string;
}

interface Student {
  name: string;
  class:string;
  section:string;
  attendance: AttendanceRecord[];
}

interface StudentTableProps {
  isDataVisible: () => void;
}

const presentIcon = Icons.persentIcon;
const absentIcon = Icons.absentIcon;
const holidayIcon = Icons.LeaveIcon;

const dummyData: Student[] = [
  {
    name: "Mark Willy",
    class:"English",
    section:"A",
    attendance: [
      { status: "present", date: "2024-03-10" },
      { status: "absent", date: "2024-03-11" },
      { status: "holiday", date: "2024-03-13" },
      { status: "present", date: "2024-03-14" },
      // ...additional days
    ],
  },
  {
    name: "Jane Doe",
    class:"English",
    section:"B",
    attendance: [
      { status: "absent", date: "2024-03-10" },
      { status: "present", date: "2024-03-11" },
      { status: "present", date: "2024-03-13" },
      { status: "holiday", date: "2024-03-14" },
      { status: "present", date: "2024-03-17" },
      { status: "holiday", date: "2024-03-14" },
      // ...additional days
    ],
  },
];

// Map statuses to icons
const statusToIcon: any = {
  present: presentIcon,
  absent: absentIcon,
  holiday: holidayIcon,
};

// Generate columns based on the attendance days
const generateColumns = () => {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  return [
    {
      accessorKey: "name",
      header: "Students",
      cell: (props: any) => <p>{props.row.original.name}</p>,
    },
    ...daysInMonth.map((day) => ({
      accessorKey: `day${day}`,
      header: `${day}`,
      cell: (props: any) => {
        const date = `2024-03-${String(day).padStart(2, "0")}`;
        const attendanceRecord = props.row.original.attendance.find(
          (record: AttendanceRecord) => record.date === date
        );
        const icon: any = attendanceRecord ? statusToIcon[attendanceRecord?.status] : null;
        return icon ? <Image src={icon} alt={attendanceRecord.status} height={15} width={20} /> : null;
      },
    })),
  ];
};

const columns = generateColumns();

const Attendancetable: React.FC<StudentTableProps> = ({ isDataVisible }) => {
  const table = useReactTable({
    data: dummyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="table">
        <div className={style.studentTable}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className={style.tr}  key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => (
                  <th className={style.thpart} key={header.id}>
                    <div className={i === 0 ? style.studentNamePart : style.thitem}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {i === 0 && (
                        <Image
                          src={Icons.SortIcon}
                          alt=""
                          className={style.upIcon}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, i) => (
                  <td
                    key={cell.id}
                    onClick={() => (i === 3 ? isDataVisible() : null)}
                    style={{padding:10}}
                  >
                    <div className={i === 0 ? style.sutdentNameText : style.studentAttandance} >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </div>
        <div className={style.btnsDiv}>
          <div className={style.btns}>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={!table.getCanPreviousPage() ? style.leftBtnDisable : style.leftBtn}
            >
              Previous
            </button>
            <p className={style.pageCount}>
              <div className={style.paginationCountBtns}>
                {Array.from({ length: table.getPageCount() }, (_, index) => index).map((val, i) => (
                  <div
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    className={
                      table.getState().pagination.pageIndex === i
                        ? style.activeBtn
                        : style.unactiveBtn
                    }
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </p>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={!table.getCanNextPage() ? style.leftBtnDisable : style.rightBtn}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendancetable;
