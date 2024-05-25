import Header from "@/Components/partials/header";
import MaxWidthWrapper from "@/Components/partials/max-width-wrapper";
import VolunteerSiteSidebar from "@/Components/partials/sidebar/volunteer/volunteer-site-sidebar";
import { Toaster } from "@/Components/ui/toaster";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import React from "react";

type VolunteerLayoutProps = {
    children: React.ReactNode;
};

const VolunteerLayout: React.FC<VolunteerLayoutProps> = ({ children }) => {
    /**
     * === STATES ===
     */
    const user = usePage<PageProps>()?.props?.auth?.user;

    return (
        <main className="relative min-h-screen">
            <Toaster />

            <Header />

            <MaxWidthWrapper>
                <div className="xmd:flex gap-2">
                    <div className={cn(user ? "block" : "hidden")}>
                        <VolunteerSiteSidebar />
                    </div>

                    <div
                        className={cn(
                            "flex-1 w-full",
                            user ? "xmd:ml-[10rem]" : ""
                        )}
                    >
                        {children}
                    </div>
                </div>
            </MaxWidthWrapper>
        </main>
    );
};

export default VolunteerLayout;
