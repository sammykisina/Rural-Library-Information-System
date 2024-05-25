import Header from "@/Components/partials/header";
import MaxWidthWrapper from "@/Components/partials/max-width-wrapper";
import SupervisorSiteSidebar from "@/Components/partials/sidebar/supervisor/supervisor-site-sidebar";
import { Toaster } from "@/Components/ui/toaster";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import React from "react";

type SupervisorLayoutProps = {
    children: React.ReactNode;
};

const SupervisorLayout: React.FC<SupervisorLayoutProps> = ({ children }) => {
    /**
     * STATES
     */
    const user = usePage<PageProps>()?.props?.auth?.user;

    return (
        <main className="relative min-h-screen">
            <Toaster />

            <Header />

            <MaxWidthWrapper>
                <div className="xmd:flex gap-2">
                    <div className={cn(user ? "block" : "hidden")}>
                        <SupervisorSiteSidebar />
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

export default SupervisorLayout;
