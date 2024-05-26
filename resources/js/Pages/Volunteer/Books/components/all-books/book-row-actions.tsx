import { Button } from "@/Components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { useSetRecoilState } from "recoil";
import {
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenu,
} from "@/Components/ui/dropdown-menu";
import React from "react";
import { cn } from "@/lib/utils";
import { Book } from "@/types/book";
import BookAtoms from "@/Atoms/Volunteer/book/book";

type BookRowActionsProps<TData> = {
    row: Row<TData>;
};

const BookRowActions: React.FC<BookRowActionsProps<Book>> = ({ row }) => {
    const book = row.original as Book;

    const setIsEditingBook = useSetRecoilState(BookAtoms.isEditingBookState);
    const setShowCreateOrEditBookDialog = useSetRecoilState(
        BookAtoms.showCreateOrEditBookDialogState
    );

    const setGlobalBook = useSetRecoilState(BookAtoms.globalBookState);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    )}
                >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                    onClick={() => {
                        setIsEditingBook(true);
                        setGlobalBook(book);
                        setShowCreateOrEditBookDialog(true);
                    }}
                >
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default BookRowActions;
