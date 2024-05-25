import { cn } from "@/lib/utils";
import { supervisorRouters } from "@/routers";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

const SupervisorLinks = () => {
    /**
     * === STATES ===
     */
    const { url } = usePage<PageProps>();

    return (
        <ul className="mb-1 flex flex-1 flex-col gap-y-4 rounded-[1rem] flex-col gap-0.5">
            {supervisorRouters?.map(
                (supervisorRouter, supervisorRouterIndex) => (
                    <li key={supervisorRouterIndex}>
                        <Link
                            preserveScroll
                            href={supervisorRouter?.href!}
                            className={cn(
                                "link w-full capitalize hover:bg-primary hover:text-primary-foreground",
                                url === supervisorRouter?.href
                                    ? "active_link"
                                    : ""
                            )}
                        >
                            {supervisorRouter?.icon}
                            {supervisorRouter?.name}
                        </Link>
                    </li>
                )
            )}
        </ul>
    );
};

export default SupervisorLinks;
