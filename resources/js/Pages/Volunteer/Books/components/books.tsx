import BookAtoms from "@/Atoms/Volunteer/book/book";
import Empty from "@/Components/partials/empty";
import StatusPill from "@/Components/partials/status-pill";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader } from "@/Components/ui/card";
import { Dialog, DialogTrigger } from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { DataTable } from "@/Components/ui/table/data-table";
import { Book, Category } from "@/types/book";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useRecoilState } from "recoil";

/**
 * LAZY LOADS
 */
const BookRowActions = React.lazy(() => import("./all-books/book-row-actions"));
const CreateOrEditBook = React.lazy(
    () => import("./all-books/create-or-edit-book")
);

const Books = ({
    books,
    categories,
}: {
    books: Book[];
    categories: Category[];
}) => {
    /**
     * === STATES ===
     */

    const [showCreateOrEditBookDialog, setShowCreateOrEditBookDialog] =
        useRecoilState(BookAtoms.showCreateOrEditBookDialogState);

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
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <React.Suspense fallback={""}>
                    <BookRowActions row={row} />
                </React.Suspense>
            ),
        },
    ];

    return (
        <Card className="rounded">
            <CardHeader className="flex flex-row items-center justify-between px-1 py-1 border-b">
                <Label className="text-lg uppercase">Books</Label>

                <Dialog
                    open={showCreateOrEditBookDialog}
                    onOpenChange={setShowCreateOrEditBookDialog}
                >
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => setShowCreateOrEditBookDialog(true)}
                            size="sm"
                        >
                            CREATE BOOK
                        </Button>
                    </DialogTrigger>

                    <React.Suspense fallback={""}>
                        <CreateOrEditBook categories={categories} />
                    </React.Suspense>
                </Dialog>
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
