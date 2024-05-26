import { useForm } from "@inertiajs/react";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Separator } from "@/Components/ui/separator";
import { Button } from "@/Components/ui/button";
import { toast } from "@/Components/ui/use-toast";
import Loading from "@/Components/partials/loading";
import IssueAtoms from "@/Atoms/Volunteer/issue";
import { cn } from "@/lib/utils";
import { Icons } from "@/Components/partials/icons";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import { Book } from "@/types/book";
import { User } from "@/types";
import { Label } from "@/Components/ui/label";

const CreateIssue = ({
    allBooks,
    allMembers,
}: {
    allBooks: Book[];
    allMembers: User[];
}) => {
    /**
     * === STATES ===
     */
    const [booksArray, setBooksArray] = React.useState<
        { value: string; label: string }[]
    >([]);

    const setShowCreateIssueDialog = useSetRecoilState(
        IssueAtoms.showCreateIssueDialogState
    );

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        book_id: "",
        user_id: "",
    });

    /**
     * === FUNCTIONS ===
     */
    const bookSelectionOptions = (books: Book[]) =>
        books?.map((book) => {
            return {
                value:
                    book?.title?.toLowerCase() +
                    " [" +
                    book?.isbn +
                    "]" +
                    "=" +
                    book?.id,
                label: book?.title?.toLowerCase() + " [" + book?.isbn + "]",
            };
        });

    const memberSelectionOptions = (users: User[]) =>
        users?.map((user) => {
            return {
                value:
                    user?.name?.toLowerCase() +
                    " [" +
                    user?.ic_no +
                    "]" +
                    "=" +
                    user?.id,
                label: user?.name?.toLowerCase() + " [" + user?.ic_no + "]",
            };
        });

    /**
     * ON VALUES SUBMIT
     */
    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        console.log("data");

        post(
            route("volunteer:book:issue:create", [
                Number(data?.book_id?.split("=")[1]),
                Number(data?.user_id?.split("=")[1]),
            ]),
            {
                onSuccess: () => {
                    setShowCreateIssueDialog(false);
                    reset();
                    toast({
                        variant: "default",
                        description: "Issue created successfully",
                    });
                },

                onError: (errors) => {
                    console.log("errors", errors);

                    toast({
                        variant: "destructive",
                        description: "Issue creation failed. Try again.",
                    });
                },
            }
        );
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create Book Issue</DialogTitle>

                <DialogDescription>
                    Fill the form below. Submit when you're done.
                </DialogDescription>

                <DialogClose
                    onClose={() => {
                        setShowCreateIssueDialog(false);
                    }}
                />
            </DialogHeader>

            <Separator />

            <form onSubmit={submit}>
                <div>
                    <Label>Book</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "flex h-10 w-full justify-between  overflow-hidden text-nowrap rounded-md border border-input  bg-background px-1  py-2 text-sm capitalize  placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                                    !data?.book_id && "text-muted-foreground"
                                )}
                            >
                                {data?.book_id
                                    ? bookSelectionOptions(allBooks)?.find(
                                          (book) =>
                                              String(book?.value) ===
                                              data?.book_id
                                      )?.label
                                    : "Select book"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="max-h-[15rem] w-fit overflow-y-scroll p-0">
                            <Command>
                                <CommandInput placeholder="Search book..." />
                                <CommandList>
                                    <CommandEmpty>No books found.</CommandEmpty>
                                    <CommandGroup>
                                        {bookSelectionOptions(allBooks)?.map(
                                            (book, bookIndex) => (
                                                <CommandItem
                                                    value={String(book?.value)}
                                                    key={bookIndex}
                                                    className="capitalize"
                                                    onSelect={() => {
                                                        setData(
                                                            "book_id",
                                                            book?.value
                                                        );
                                                    }}
                                                >
                                                    <Icons.check
                                                        className={cn(
                                                            "mr-2 h-4 w-4 text-primary",
                                                            String(
                                                                book?.value
                                                            ) === data?.book_id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {book?.label}
                                                </CommandItem>
                                            )
                                        )}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <Label>Member</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "flex h-10 w-full justify-between  overflow-hidden text-nowrap rounded-md border border-input  bg-background px-1  py-2 text-sm capitalize  placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                                    !data?.user_id && "text-muted-foreground"
                                )}
                            >
                                {data?.user_id
                                    ? memberSelectionOptions(allMembers)?.find(
                                          (member) =>
                                              String(member?.value) ===
                                              data?.user_id
                                      )?.label
                                    : "Select member"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="max-h-[15rem] w-fit overflow-y-scroll p-0">
                            <Command>
                                <CommandInput placeholder="Search member..." />
                                <CommandList>
                                    <CommandEmpty>
                                        No member found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {memberSelectionOptions(
                                            allMembers
                                        )?.map((member, memberIndex) => (
                                            <CommandItem
                                                value={String(member?.value)}
                                                key={memberIndex}
                                                className="capitalize"
                                                onSelect={() => {
                                                    setData(
                                                        "user_id",
                                                        member?.value
                                                    );
                                                }}
                                            >
                                                <Icons.check
                                                    className={cn(
                                                        "mr-2 h-4 w-4 text-primary",
                                                        String(
                                                            member?.value
                                                        ) === data?.user_id
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {member?.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        className="mt-3"
                        disabled={processing}
                    >
                        {processing ? (
                            <Loading title="creating..." />
                        ) : (
                            "Create issue"
                        )}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default CreateIssue;
