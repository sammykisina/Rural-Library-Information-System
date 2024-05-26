import { DataTablePagination } from "./data-table-pagination";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";

import {
    getFacetedUniqueValues,
    getPaginationRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
    getFacetedRowModel,
    getSortedRowModel,
    VisibilityState,
    getCoreRowModel,
    useReactTable,
    SortingState,
    ColumnDef,
    flexRender,
    getExpandedRowModel,
    Row,
} from "@tanstack/react-table";

import {
    TableHeader,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Table,
} from "@/Components/ui/table";
import { cn } from "@/lib/utils";
import { Separator } from "../separator";
import { Input } from "../input";
import { Button } from "../button";
import { useSetRecoilState } from "recoil";
import { Icons } from "@/Components/partials/icons"
import AppAtoms from "@/Atoms/app";

interface DataTableProps<TData, TValue> {
    columns: any;
    pagination?: boolean;
    shouldSelect?: boolean;
    setSearchKey?: Dispatch<SetStateAction<string>>;
    tableHeight?: string;
    data: TData[];
    selectedRowData?: {
        title: string;
        variant?: string;
        extraInfo?: any;
        actions: () => void;
    };

    renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
    getRowCanExpand?: (row: Row<TData>) => boolean;
}

export function DataTable<TData, TValue>({
    pagination = true,
    shouldSelect = false,
    tableHeight = "",
    columns,
    data,
    selectedRowData,

    getRowCanExpand,
    renderSubComponent,
}: DataTableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const setSelectedRows = useSetRecoilState(AppAtoms.selectedRowsStates);

    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,

        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            globalFilter,
        },
        enableRowSelection: true,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),

        getRowCanExpand,
        getExpandedRowModel: getExpandedRowModel(),
    });

    const cleanTable = () => {
        table.toggleAllPageRowsSelected(false);
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center justify-between gap-1 px-1 ">
                    <div className="flex flex-col gap-2">
                        <div
                            className={cn(
                                "flex w-full flex-1 items-center justify-start rounded-md border   pl-2 text-start ring-emerald-600/20"
                            )}
                        >
                            <Icons.search className=" text-primary" />
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-4"
                            />
                            <Input
                                placeholder={`Search...`}
                                value={globalFilter}
                                onChange={(event) =>
                                    setGlobalFilter(event?.target?.value)
                                }
                                className="max-w-full border border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        {pagination && (
                            <DataTablePagination
                                table={table}
                                shouldSelect={shouldSelect}
                            />
                        )}
                    </div>
                </div>

                <div className="px-1">
                    {table?.getFilteredSelectedRowModel().rows?.length > 0 && (
                        <Button
                            className="w-full xs:w-1/2"
                            size="sm"
                            variant={
                                selectedRowData?.variant
                                    ? "destructive"
                                    : "default"
                            }
                            onClick={() => {
                                setSelectedRows({
                                    rows: table?.getFilteredSelectedRowModel()
                                        ?.rows,
                                    extraInfo: selectedRowData?.extraInfo,
                                    cleanTable: cleanTable,
                                });

                                selectedRowData?.actions();
                            }}
                        >
                            {selectedRowData?.title}
                        </Button>
                    )}
                </div>
            </div>

            <div className={`border-t ${tableHeight}`}>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <Fragment key={row.id}>
                                    <TableRow
                                        className={cn(
                                            index % 2 !== 0
                                                ? "bg-primary/0.5"
                                                : ""
                                        )}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    {row.getIsExpanded() && (
                                        <tr>
                                            <td
                                                colSpan={
                                                    row.getVisibleCells().length
                                                }
                                            >
                                                {renderSubComponent!({ row })}
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
