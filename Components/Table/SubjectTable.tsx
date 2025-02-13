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
    isDataVisible: () => void;
    data: any;
    columns: any;
}

const SubjectTable: React.FC<StudentTableProps> = ({ isDataVisible, data, columns }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className={style.tableContainer}>
            <div className={style.studentTable}>
                <table style={{ width: "100%" }}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup, index) => (
                            <tr className={style.tr} key={headerGroup.id}>
                                {headerGroup.headers.map((header, i) => (
                                    <th className={style.th} key={header.id}>
                                        {i === 0 ? (
                                            <input type="checkbox" />
                                        ) : (
                                            <div className={style.thitem}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
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
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr className={style.tr} key={row.id}>
                                {row.getVisibleCells().map((cell, i) => (
                                    <td
                                        key={cell.id}
                                        onClick={() => (i === 3 ? isDataVisible() : null)}
                                        className={i === 3 ? style.nameLink : style.nameLinktrue}
                                    >
                                        {i === 1 ? (
                                            <div style={{ width: "175px", textAlign: "left", paddingLeft: 40 }}>
                                                {flexRender(cell.column.columnDef.aggregatedCell, cell.getContext())}
                                            </div>
                                        ) : i > 1 ? (
                                            <div style={{ width: "175px", color: "#8A8A8A", textAlign: "left", paddingLeft: 40 }}>
                                                {flexRender(cell.column.columnDef.aggregatedCell, cell.getContext())}
                                            </div>
                                        ) : null}

                                        {i === 0 ? <input type="checkbox" /> : null}

                                        {i === 4 ? (
                                            <div style={{ width: "175px", display: "flex", justifyContent: "center" }}>
                                                <Image
                                                    src={Icons.hiddenEyeLight}
                                                    alt=""
                                                    height={17}
                                                    width={20}
                                                    style={{ marginRight: 10 }}
                                                />
                                                <Image
                                                    src={Icons.editDark}
                                                    alt=""
                                                    height={20}
                                                    width={20}
                                                />
                                            </div>
                                        ) : null}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={style.btnsDiv}>
                    <div className={style.btns}>
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className={!table.getCanPreviousPage() ? style.leftBtnDisable : style.leftBtn}
                        >
                            Previous
                        </button>
                        <div className={style.pageCount}>
                            <div className={style.paginationCountBtns}>
                                {Array.from({ length: table.getPageCount() }, (_, index) => table.getPageCount()).map((val, i) => (
                                    <div
                                        onClick={() => table.setPageIndex(i)}
                                        className={table.getState().pagination.pageIndex + 1 === i + 1 ? style.activeBtn : style.unactiveBtn}
                                        key={i}
                                    >
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
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

export default SubjectTable;
