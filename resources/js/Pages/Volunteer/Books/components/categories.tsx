import CategoryAtoms from "@/Atoms/Volunteer/book/category";
import Empty from "@/Components/partials/empty";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader } from "@/Components/ui/card";
import { Dialog, DialogTrigger } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { DataTable } from "@/Components/ui/table/data-table";
import { Category } from "@/types/book";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useRecoilState } from "recoil";

/**
 * LAZY LOADS
 */
const CategoryRowActions = React.lazy(
    () => import("./categories/category-row-action")
);
const CreateOrEditCategory = React.lazy(
    () => import("./categories/create-or-edit-category")
);

const Categories = ({ categories }: { categories: Category[] }) => {
    /**
     * === STATES ===
     */

    const [showCreateOrEditCategoryDialog, setShowCreateOrEditCategoryDialog] =
        useRecoilState(CategoryAtoms.showCreateOrEditCategoryDialogState);

    /**
     * CATEGORY COLUMNS
     */
    const categoryColumns: ColumnDef<Category>[] = [
        {
            accessorKey: "number",
            header: "#",
            cell: ({ row }) => row?.index + 1,
        },
        {
            accessorKey: "name",
            header: "Name",
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
                    <CategoryRowActions row={row} />
                </React.Suspense>
            ),
        },
    ];

    return (
        <Card className="rounded">
            <CardHeader className="flex flex-row items-center justify-between px-1 py-1 border-b">
                <Label className="text-lg uppercase">Book Categories</Label>

                <Dialog
                    open={showCreateOrEditCategoryDialog}
                    onOpenChange={setShowCreateOrEditCategoryDialog}
                >
                    <DialogTrigger asChild>
                        <Button
                            onClick={() =>
                                setShowCreateOrEditCategoryDialog(true)
                            }
                            size="sm"
                        >
                            CREATE CATEGORIES
                        </Button>
                    </DialogTrigger>

                    <React.Suspense fallback={""}>
                        <CreateOrEditCategory />
                    </React.Suspense>
                </Dialog>
            </CardHeader>

            {/* table */}
            <div className="mt-2">
                {categories?.length > 0 ? (
                    <DataTable
                        data={categories ?? []}
                        pagination={true}
                        columns={categoryColumns}
                    />
                ) : (
                    <Empty title="NO CATEGORIES CREATED YET" />
                )}
            </div>
        </Card>
    );
};

export default Categories;
