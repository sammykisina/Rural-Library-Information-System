import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import MaxWidthWrapper from "@/Components/partials/max-width-wrapper";

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <MaxWidthWrapper>
            <Head title="Welcome" />
            <div className="">
                <header className="px-2">
                    <nav className="-mx-3 flex flex-1 justify-end">
                        {auth.user ? (
                            <Link
                                href={route(
                                    auth?.user?.role === "volunteer"
                                        ? "volunteer:dashboard"
                                        : auth?.user?.role === "supervisor"
                                        ? "supervisor:dashboard"
                                        : "/"
                                )}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
            </div>
        </MaxWidthWrapper>
    );
}
