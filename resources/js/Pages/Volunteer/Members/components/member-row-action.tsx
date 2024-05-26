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
import { User } from "@/types";
import MemberAtoms from "@/Atoms/Volunteer/member";

type MemberRowActionsProps<TData> = {
    row: Row<TData>;
};

const MemberRowActions: React.FC<MemberRowActionsProps<User>> = ({ row }) => {
    const member = row.original as User;

    const setIsEditingMember = useSetRecoilState(
        MemberAtoms.isEditingMemberState
    );
    const setShowCreateOrEditMemberDialog = useSetRecoilState(
        MemberAtoms.showCreateOrEditMemberDialogState
    );

    const setGlobalMember = useSetRecoilState(MemberAtoms.globalMemberState);

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
                        setIsEditingMember(true);
                        setGlobalMember(member);
                        setShowCreateOrEditMemberDialog(true);
                    }}
                >
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MemberRowActions;
