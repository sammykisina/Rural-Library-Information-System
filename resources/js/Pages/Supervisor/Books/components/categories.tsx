import Empty from "@/Components/partials/empty";
import { Card, CardHeader } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { DataTable } from "@/Components/ui/table/data-table";
import { Category } from "@/types/book";
import { ColumnDef } from "@tanstack/react-table";

const Categories = ({ categories }: { categories: Category[] }) => {
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
    ];

    return (
        <Card className="rounded">
            <CardHeader className="flex flex-row items-center justify-start px-1 py-1 border-b">
                <Label className="text-lg uppercase">Book Categories</Label>
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
