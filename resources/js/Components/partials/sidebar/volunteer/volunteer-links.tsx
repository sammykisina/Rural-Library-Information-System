import { cn } from "@/lib/utils";
import { volunteerRouters } from "@/routers";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

const VolunteerLinks = () => {
    /**
     * === STATES ===
     */
    const { url } = usePage<PageProps>();

    return (
        <ul className="mb-1 flex flex-1 flex-col gap-y-4 rounded-[1rem] flex-col gap-0.5">
            {volunteerRouters?.map((volunteerRouter, volunteerRouterIndex) => (
                <li key={volunteerRouterIndex}>
                    <Link
                        preserveScroll
                        href={volunteerRouter?.href!}
                        className={cn(
                            "link w-full capitalize hover:bg-primary hover:text-primary-foreground",
                            url === volunteerRouter?.href ? "active_link" : ""
                        )}
                    >
                        {volunteerRouter?.icon}
                        {volunteerRouter?.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default VolunteerLinks;
