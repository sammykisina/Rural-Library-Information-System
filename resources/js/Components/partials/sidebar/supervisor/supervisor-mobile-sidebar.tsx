import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import React from "react";
import { Icons } from "../../icons";
import Logo from "../../logo";
import { Separator } from "@/Components/ui/separator";
import { ScrollArea } from "@/Components/ui/scroll-area";
import SupervisorLinks from "./supervisor-links";

const SupervisorMobileSidebar = () => {
    /**
     * === STATES ===
     */
    const auth = usePage<PageProps>()?.props?.auth;
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 xmd:hidden"
                    )}
                >
                    <Icons.menu className="h-5 w-5" />
                    <span className="sr-only">show mobile sidebar</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[220px] xmd:hidden">
                <div className="flex items-center justify-between">
                    <Logo />

                    <Button
                        variant="ghost"
                        className={cn(
                            "mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        )}
                        onClick={() => setOpen(false)}
                    >
                        <Icons.x className="h-5 w-5" />
                        <span className="sr-only">hide mobile sidebar</span>
                    </Button>
                </div>

                <Separator />

                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-6">
                    <div className="flex flex-col space-y-3">
                        <SupervisorLinks />
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default SupervisorMobileSidebar;
