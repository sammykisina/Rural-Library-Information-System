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
import IssueAtoms from "@/Atoms/Volunteer/issue";
import { Issue } from "@/types/issue";
import { router } from "@inertiajs/react";
import { toast } from "@/Components/ui/use-toast";

type IssueRowActionsProps<TData> = {
    row: Row<TData>;
};

const IssueRowActions: React.FC<IssueRowActionsProps<Issue>> = ({ row }) => {
    const issue = row.original as Issue;

    const setGlobalIssue = useSetRecoilState(IssueAtoms.globalIssueState);

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
                        router.patch(
                            route("volunteer:book:issue:update", issue?.id),
                            {},
                            {
                                onSuccess: () => {
                                    toast({
                                        variant: "default",
                                        description:
                                            "Issue created successfully",
                                    });
                                },

                                onError: (errors) => {
                                    console.log("errors", errors);

                                    toast({
                                        variant: "destructive",
                                        description:
                                            "Issue creation failed. Try again.",
                                    });
                                },
                            }
                        );
                    }}
                >
                    Receive Book
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default IssueRowActions;
