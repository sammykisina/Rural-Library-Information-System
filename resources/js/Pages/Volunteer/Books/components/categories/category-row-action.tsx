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
import CategoryAtoms from "@/Atoms/Volunteer/book/category";
import { Category } from "@/types/book";
type CategoryRowActionsProps<TData> = {
    row: Row<TData>;
};

const CategoryRowActions: React.FC<CategoryRowActionsProps<Category>> = ({
    row,
}) => {
    const category = row.original as Category;

    const setIsEditingCategory = useSetRecoilState(
        CategoryAtoms.isEditingCategoryState
    );
    const setShowCreateOrEditCategoryDialog = useSetRecoilState(
        CategoryAtoms.showCreateOrEditCategoryDialogState
    );

    const setGlobalCategory = useSetRecoilState(
        CategoryAtoms.globalCategoryState
    );

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
                        setIsEditingCategory(true);
                        setGlobalCategory(category);
                        setShowCreateOrEditCategoryDialog(true);
                    }}
                >
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CategoryRowActions;
