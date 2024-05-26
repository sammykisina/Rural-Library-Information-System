import { User } from "@/types";
import Empty from "@/Components/partials/empty";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogTrigger } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { DataTable } from "@/Components/ui/table/data-table";
import { Head } from "@inertiajs/react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useRecoilState } from "recoil";
import { Card, CardHeader } from "@/Components/ui/card";
import React from "react";
import IssueAtoms from "@/Atoms/Volunteer/issue";
import VolunteerLayout from "@/Layouts/volunteer-layout";
import { Issue } from "@/types/issue";
import { Book } from "@/types/book";
import StatusPill from "@/Components/partials/status-pill";

/**
 * LAZY LOADS
 */
const IssueRowActions = React.lazy(
    () => import("./components/issue-row-action")
);
const CreateIssue = React.lazy(() => import("./components/create-issue"));

const Issues = ({
    issues,
    books,
    members,
}: {
    issues: Issue[];
    books: Book[];
    members: User[];
}) => {
    /**
     * === STATES ===
     */
    const [showCreateIssueDialog, setShowCreateIssueDialog] = useRecoilState(
        IssueAtoms.showCreateIssueDialogState
    );

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
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <React.Suspense fallback={""}>
                    <IssueRowActions row={row} />
                </React.Suspense>
            ),
        },
    ];

    console.log("members", members);

    return (
        <>
            <Head title="Issues" />

            <VolunteerLayout>
                <Card className="mt-2 rounded">
                    <CardHeader className="flex flex-row items-center justify-between p-1 border-b">
                        <Label className="text-lg uppercase">Issues</Label>

                        <div className="flex items-center gap-2">
                            <Dialog
                                open={showCreateIssueDialog}
                                onOpenChange={setShowCreateIssueDialog}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() =>
                                            setShowCreateIssueDialog(true)
                                        }
                                        size="sm"
                                    >
                                        CREATE ISSUE
                                    </Button>
                                </DialogTrigger>

                                <React.Suspense fallback={""}>
                                    <CreateIssue
                                        allBooks={books}
                                        allMembers={members}
                                    />
                                </React.Suspense>
                            </Dialog>
                        </div>
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
            </VolunteerLayout>
        </>
    );
};

export default Issues;
