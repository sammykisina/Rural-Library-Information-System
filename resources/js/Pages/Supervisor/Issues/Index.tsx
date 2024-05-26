import Empty from "@/Components/partials/empty";
import { Label } from "@/Components/ui/label";
import { DataTable } from "@/Components/ui/table/data-table";
import { Head } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardHeader } from "@/Components/ui/card";
import { Issue } from "@/types/issue";
import StatusPill from "@/Components/partials/status-pill";
import SupervisorLayout from "@/Layouts/supervisor-layout";

const Issues = ({ issues }: { issues: Issue[] }) => {
    /**
     * UNIT TENANT COLUMNS
     */
    const issueColumns: ColumnDef<Issue>[] = [
        {
            accessorKey: "number",
            header: "#",
            cell: ({ row }) => row?.index + 1,
        },
        {
            accessorKey: "borrower.ic_no",
            header: "Member IC NO",
        },
        {
            accessorKey: "borrower.name",
            header: "Member Name",
            cell: ({ row }) => (
                <span className="capitalize">
                    {row?.original?.borrower?.name}
                </span>
            ),
        },
        {
            accessorKey: "book.title",
            header: "Book Title",
            cell: ({ row }) => (
                <span className="capitalize">{row?.original?.book?.title}</span>
            ),
        },
        {
            accessorKey: "book.isbn",
            header: "Book ISBN",
            cell: ({ row }) => (
                <span className="capitalize">{row?.original?.book?.isbn}</span>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <StatusPill status={row?.original?.status} />,
        },
        {
            accessorKey: "borrowed_at.string",
            header: "Borrowed At",
        },
        {
            accessorKey: "return_date.string",
            header: "Return Date",
        },
        {
            accessorKey: "date_returned.string",
            header: "Date Returned",
        },
    ];

    return (
        <>
            <Head title="Issues" />

            <SupervisorLayout>
                <Card className="mt-2 rounded">
                    <CardHeader className="flex flex-row items-center justify-between p-1 border-b">
                        <Label className="text-lg uppercase">Issues</Label>
                    </CardHeader>

                    {/* table */}
                    <div className="mt-2">
                        {issues?.length > 0 ? (
                            <DataTable
                                data={issues ?? []}
                                pagination={true}
                                columns={issueColumns}
                            />
                        ) : (
                            <Empty title="NO ISSUES FOUND" />
                        )}
                    </div>
                </Card>
            </SupervisorLayout>
        </>
    );
};

export default Issues;
