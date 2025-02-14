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
  isDataVisible: (item: any) => void; // This allows it to accept a function with the `item` argument.
  data: any[];
  columns: any[];
}
const Tasttable: React.FC<StudentTableProps> = ({ isDataVisible, data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
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
                            className={style.upIcon}
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
                    style={{ width: "130px" }}
                    key={cell.id}
                    onClick={() =>
                      i === 3 ? isDataVisible(cell?.row?.original) : null
                    }
                    className={i === 3 ? style.nameLink : style.nameLinktrue}
                  >
                    {i === 2 ? (
                      <Image
                        src={(cell.row.original as any)?.picture}
                        width={30}
                        height={30}
                        style={{ height: 30, width: 30, borderRadius: 30 }}
                        alt="Picture of the author"
                        className={style.logoImage}
                      />
                    ) : (
                      flexRender(
                        cell.column.columnDef.aggregatedCell,
                        cell.getContext()
                      )
                    )}
                    {(cell.row.original as any)?.Status}
                    {i === 0 ? <input type="checkbox" /> : null}
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

export default Tasttable;
