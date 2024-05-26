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
import VolunteerAtoms from "@/Atoms/Supervisor/volunteer";
import { User } from "@/types";

type VolunteerRowActionsProps<TData> = {
    row: Row<TData>;
};

const VolunteerRowActions: React.FC<VolunteerRowActionsProps<User>> = ({
    row,
}) => {
    const volunteer = row.original as User;

    const setIsEditingVolunteer = useSetRecoilState(
        VolunteerAtoms.isEditingVolunteerState
    );
    const setShowCreateOrEditVolunteerDialog = useSetRecoilState(
        VolunteerAtoms.showCreateOrEditVolunteerDialogState
    );

    const setGlobalVolunteer = useSetRecoilState(
        VolunteerAtoms.globalVolunteerState
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
                        setIsEditingVolunteer(true);
                        setGlobalVolunteer(volunteer);
                        setShowCreateOrEditVolunteerDialog(true);
                    }}
                >
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default VolunteerRowActions;
