import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { ScrollArea } from "../../../ui/scroll-area";
import SupervisorLinks from "./supervisor-links";

const SupervisorSiteSidebar = () => {
    return (
        <aside
            className={cn("fixed h-full hidden xmd:block border-r w-[200px]")}
        >
            <div className="flex h-full flex-col gap-2">
                <ScrollArea className="my-2 pb-6 h-[calc(100vh-56px)] pr-1">
                    <div className="flex flex-col space-y-2">
                        <SupervisorLinks />
                    </div>
                </ScrollArea>
            </div>
        </aside>
    );
};

export default SupervisorSiteSidebar;
