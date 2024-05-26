import { User } from "@/types";
import Empty from "@/Components/partials/empty";
import { Label } from "@/Components/ui/label";
import { DataTable } from "@/Components/ui/table/data-table";
import { Head } from "@inertiajs/react";
import { ColumnDef, Row } from "@tanstack/react-table";
import SupervisorLayout from "@/Layouts/supervisor-layout";
import { Card, CardHeader } from "@/Components/ui/card";

const Members = ({ members }: { members: User[] }) => {
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
    ];

    console.log("members", members);

    return (
        <>
            <Head title="Members" />

            <SupervisorLayout>
                <Card className="mt-2 rounded">
                    <CardHeader className="flex flex-row items-center justify-start p-1 border-b">
                        <Label className="text-lg uppercase">Members</Label>
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
            </SupervisorLayout>
        </>
    );
};

export default Members;
