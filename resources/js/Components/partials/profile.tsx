import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { buttonVariants } from "@/Components/ui/button";
import {
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Icons } from "./icons";

const Profile = () => {
    /**
     * === STATES ===
     */
    const user = usePage<PageProps>().props.auth.user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="" asChild>
                <Avatar className="h-9 w-9 cursor-pointer ">
                    <AvatarImage className="" alt={user?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        RL
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                sideOffset={2}
                align="end"
                className="flex w-[16rem] flex-col rounded-xl p-0"
            >
                <DropdownMenuLabel>Account</DropdownMenuLabel>

                <DropdownMenuSeparator className="my-0" />

                <DropdownMenuGroup className="">
                    <DropdownMenuItem className="p-0">
                        <Link
                            href={route("profile.edit")}
                            className="flex justify-between items-center group w-full hover:bg-muted h-full p-2"
                        >
                            <div className="flex gap-2 items-center">
                                <Icons.user className="mr-2 " />
                                <span>Profile</span>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuItem className="rounded-none p-0 border-t">
                    <Link
                        className="w-full"
                        method="post"
                        as="button"
                        href={route("logout")}
                    >
                        <div
                            className={cn(
                                "w-full p-6 flex h-full  gap-2 items-center justify-center",
                                buttonVariants({
                                    className: "rounded-none",
                                    variant: "ghost",
                                })
                            )}
                        >
                            <Icons.logOut className="text-red-500" />
                            Logout
                        </div>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Profile;
