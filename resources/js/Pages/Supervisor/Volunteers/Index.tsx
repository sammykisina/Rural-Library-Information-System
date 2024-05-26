import SupervisorLayout from "@/Layouts/supervisor-layout";
import { User } from "@/types";
import Empty from "@/Components/partials/empty";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Dialog, DialogTrigger } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { DataTable } from "@/Components/ui/table/data-table";
import { Head } from "@inertiajs/react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useRecoilState } from "recoil";
import { Card, CardHeader } from "@/Components/ui/card";
import React from "react";
import VolunteerAtoms from "@/Atoms/Supervisor/volunteer";

/**
 * LAZY LOADS
 */
const VolunteerRowActions = React.lazy(
    () => import("./components/volunteer-row-action")
);
const CreateOrEditVolunteer = React.lazy(
    () => import("./components/create-or-edit-volunteer")
);

const Volunteers = ({ volunteers }: { volunteers: User[] }) => {
    /**
     * === STATES ===
     */
    const [
        showCreateOrEditVolunteerDialog,
        setShowCreateOrEditVolunteerDialog,
    ] = useRecoilState(VolunteerAtoms.showCreateOrEditVolunteerDialogState);

    /**
     * UNIT TENANT COLUMNS
     */
    const volunteerColumns: ColumnDef<User>[] = [
        {
            accessorKey: "number",
            header: "#",
            cell: ({ row }) => row?.index + 1,
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
            accessorKey: "created_at.string",
            header: "Created At",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <React.Suspense fallback={""}>
                    <VolunteerRowActions row={row} />
                </React.Suspense>
            ),
        },
    ];

    console.log("volunteers", volunteers);

    return (
        <>
            <Head title="Volunteers" />

            <SupervisorLayout>
                <Card className="mt-2 rounded">
                    <CardHeader className="flex flex-row items-center justify-between p-1 border-b">
                        <Label className="text-lg uppercase">Volunteers</Label>

                        <div className="flex items-center gap-2">
                            <Dialog
                                open={showCreateOrEditVolunteerDialog}
                                onOpenChange={
                                    setShowCreateOrEditVolunteerDialog
                                }
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() =>
                                            setShowCreateOrEditVolunteerDialog(
                                                true
                                            )
                                        }
                                        size="sm"
                                    >
                                        CREATE VOLUNTEER
                                    </Button>
                                </DialogTrigger>

                                <React.Suspense fallback={""}>
                                    <CreateOrEditVolunteer />
                                </React.Suspense>
                            </Dialog>
                        </div>
                    </CardHeader>

                    {/* table */}
                    <div className="mt-2">
                        {volunteers?.length > 0 ? (
                            <DataTable
                                data={volunteers ?? []}
                                pagination={true}
                                columns={volunteerColumns}
                            />
                        ) : (
                            <Empty title="NO VOLUNTEERS FOUND" />
                        )}
                    </div>
                </Card>
            </SupervisorLayout>
        </>
    );
};

export default Volunteers;
