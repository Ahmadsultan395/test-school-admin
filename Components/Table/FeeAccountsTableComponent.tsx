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

import style from "./table.module.css";



interface StudentTableProps {
  isDataVisible: () => void
  data: any
  columns: any
}


const FeeAccountsTable: React.FC<StudentTableProps> = ({ isDataVisible, data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  // console.log("------>>>>>>>>", table.getRowModel().rows);
  //   console.log(table)
  return (
    <div>
      <div className="table">
        <div className={style.studentTable} style={{ width: "100%" }}>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <thead key={index} >
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className={style.tr} key={headerGroup.id}>
                  {headerGroup.headers.map((header, i) => (
                    <th className={style.th} style={{ width: "130px" }} key={header.id}>
                      {i === 0 ? (
                        <input type="checkbox" />
                      ) : (
                        <div className={style.thitem}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <Image
                            src={Icons.SortIcon}
                            alt=""
                            style={{ height: 15, width: 15 }}
                          />
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          ))}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr className={style.tr} key={row.id}>
                {row.getVisibleCells().map((cell, i) => (
                  <td
                    key={cell.id}
                    onClick={() =>
                      i === 3 ? isDataVisible() : null
                    }
                    className={i === 3 ? style.nameLink : style.nameLinktrue}
                  >
                    {i === 0 ? <input type="checkbox" /> : null}
                    {i === 2 ? (
                      <Image
                        src={
                          // (cell.row.original as any)?.profile
                          Icons.MyProfileIcon
                        }
                        width={30}
                        height={30}
                        alt="Picture of the author"
                        className={style.logoImage}
                      />

                    ) : i === 6 ? <div style={{
                      padding: 5,
                      backgroundColor: (cell.row.original as any)?.status === "Paid" ? "rgb(230,255,247,100)" : "rgb(255,234,234,100)",
                      color: (cell.row.original as any)?.status === "Paid" ? "#40997E":"#FF3737", borderRadius: 7
                    }}>
                      {flexRender(
                        cell.column.columnDef.aggregatedCell,
                        cell.getContext()
                      )}
                    </div> : (
                      flexRender(
                        cell.column.columnDef.aggregatedCell,
                        cell.getContext()
                      )
                    )}
                    {(cell.row.original as any)?.Status}
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
              className={
                !table.getCanPreviousPage()
                  ? style.leftBtnDisable
                  : style.leftBtn
              }
            >
              Previous
            </button>
            <p className={style.pageCount}>
              <div className={style.paginationCountBtns}>
                {Array.from({ length: table.getPageCount() }, (_, index) =>
                  table.getPageCount()
                ).map((val, i) => {
                  return (
                    <div
                      onClick={() => table.setPageIndex(i)}
                      className={
                        table.getState().pagination.pageIndex + 1 === i + 1
                          ? style.activeBtn
                          : style.unactiveBtn
                      }
                      key={i}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            </p>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={
                !table.getCanNextPage() ? style.leftBtnDisable : style.rightBtn
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeAccountsTable;
