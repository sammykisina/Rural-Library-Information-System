import Empty from "@/Components/partials/empty";
import StatusPill from "@/Components/partials/status-pill";
import { Card, CardHeader } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { DataTable } from "@/Components/ui/table/data-table";
import { Book } from "@/types/book";
import { ColumnDef } from "@tanstack/react-table";

const Books = ({ books }: { books: Book[] }) => {
    /**
     * BOOK COLUMNS
     */
    const bookColumns: ColumnDef<Book>[] = [
        {
            accessorKey: "number",
            header: "#",
            cell: ({ row }) => row?.index + 1,
        },
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "isbn",
            header: "ISBN",
        },
        {
            accessorKey: "category.name",
            header: "Category",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <StatusPill status={row?.original?.status} />,
        },
        {
            accessorKey: "author",
            header: "Author",
        },
        {
            accessorKey: "publisher",
            header: "Publisher",
        },
        {
            accessorKey: "publication_year",
            header: "Publication Year",
        },
        {
            accessorKey: "created_at.string",
            header: "Created At",
        },
    ];

    return (
        <Card className="rounded">
            <CardHeader className="flex flex-row items-center justify-start px-1 py-1 border-b">
                <Label className="text-lg uppercase">Books</Label>
            </CardHeader>

            {/* table */}
            <div className="mt-2">
                {books?.length > 0 ? (
                    <DataTable
                        data={books ?? []}
                        pagination={true}
                        columns={bookColumns}
                    />
                ) : (
                    <Empty title="NO BOOKS FOUND" />
                )}
            </div>
        </Card>
    );
};

export default Books;
