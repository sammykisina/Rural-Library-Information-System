import { Link, usePage } from "@inertiajs/react";
import MaxWidthWrapper from "./max-width-wrapper";
import { PageProps } from "@/types";
import Logo from "./logo";
import SupervisorMobileSidebar from "./sidebar/supervisor/supervisor-mobile-sidebar";
import Profile from "./profile";
import { buttonVariants } from "../ui/button";
import VolunteerMobileSidebar from "./sidebar/volunteer/volunteer-mobile-sidebar";

const Header = () => {
    /**
     * === STATES ===
     */
    const user = usePage<PageProps>().props?.auth?.user;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <MaxWidthWrapper className="flex justify-between items-center h-14">
                <div className="flex flex-row gap-2 items-center">
                    {user?.role === "supervisor" ? (
                        <SupervisorMobileSidebar />
                    ) : user?.role === "volunteer" ? (
                        <VolunteerMobileSidebar />
                    ) : null}

                    <Logo />
                </div>

                <div className="flex gap-2">
                    {user ? (
                        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                            <div className="w-full flex-1 md:w-auto md:flex-none"></div>

                            <nav className="flex items-center gap-5 ">
                                <div className="flex items-center gap-3">
                                    {/* <Icons.bell className="text-primary" /> */}
                                    <Profile />
                                </div>
                            </nav>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-lg">
                            <Link
                                href={route("tenant-login")}
                                className={buttonVariants({
                                    variant: "link",
                                })}
                            >
                                Log in
                            </Link>
                        </div>
                    )}
                </div>
            </MaxWidthWrapper>
        </header>
    );
};

export default Header;
