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
import MemberAtoms from "@/Atoms/Volunteer/member";
import VolunteerLayout from "@/Layouts/volunteer-layout";

/**
 * LAZY LOADS
 */
const MemberRowActions = React.lazy(
    () => import("./components/member-row-action")
);
const CreateOrEditMember = React.lazy(
    () => import("./components/create-or-edit-member")
);

const Members = ({ members }: { members: User[] }) => {
    /**
     * === STATES ===
     */
    const [showCreateOrEditMemberDialog, setShowCreateOrEditMemberDialog] =
        useRecoilState(MemberAtoms.showCreateOrEditMemberDialogState);

    /**
     * UNIT TENANT COLUMNS
     */
    const memberColumns: ColumnDef<User>[] = [
        {
            accessorKey: "number",
            header: "#",
            cell: ({ row }) => row?.index + 1,
        },
        {
            accessorKey: "ic_no",
            header: "IC NO",
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <span className="capitalize">{row?.getValue("name")}</span>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "address",
            header: "Address",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "created_at.string",
            header: "Created At",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <React.Suspense fallback={""}>
                    <MemberRowActions row={row} />
                </React.Suspense>
            ),
        },
    ];

    console.log("members", members);

    return (
        <>
            <Head title="Members" />

            <VolunteerLayout>
                <Card className="mt-2 rounded">
                    <CardHeader className="flex flex-row items-center justify-between p-1 border-b">
                        <Label className="text-lg uppercase">Members</Label>

                        <div className="flex items-center gap-2">
                            <Dialog
                                open={showCreateOrEditMemberDialog}
                                onOpenChange={setShowCreateOrEditMemberDialog}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() =>
                                            setShowCreateOrEditMemberDialog(
                                                true
                                            )
                                        }
                                        size="sm"
                                    >
                                        CREATE MEMBER
                                    </Button>
                                </DialogTrigger>

                                <React.Suspense fallback={""}>
                                    <CreateOrEditMember />
                                </React.Suspense>
                            </Dialog>
                        </div>
                    </CardHeader>

                    {/* table */}
                    <div className="mt-2">
                        {members?.length > 0 ? (
                            <DataTable
                                data={members ?? []}
                                pagination={true}
                                columns={memberColumns}
                            />
                        ) : (
                            <Empty title="NO MEMBERS FOUND" />
                        )}
                    </div>
                </Card>
            </VolunteerLayout>
        </>
    );
};

export default Members;
