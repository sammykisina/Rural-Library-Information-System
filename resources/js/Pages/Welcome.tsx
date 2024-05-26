import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import MaxWidthWrapper from "@/Components/partials/max-width-wrapper";

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <MaxWidthWrapper>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-100">
                <header className="bg-white py-4">
                    <nav className="container mx-auto px-4 flex justify-end">
                        {auth.user ? (
                            <Link
                                href={
                                    auth.user.role === "volunteer"
                                        ? "/volunteer/dashboard"
                                        : auth.user.role === "supervisor"
                                        ? "/supervisor/dashboard"
                                        : "/"
                                }
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </Link>
                        )}
                    </nav>
                </header>

                <main className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome to Kampung Library
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Our mission is to provide access to books and
                        educational resources to the villagers of Kampung.
                        Managed by dedicated volunteers, our library serves as a
                        hub for learning and community activities.
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/about"
                            className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                        >
                            Learn More
                        </Link>
                    </div>
                </main>

                <section className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-900 text-center">
                            Our Services
                        </h2>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6 bg-gray-50 rounded-lg border shadow-md text-center">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Book Lending
                                </h3>
                                <p className="mt-4 text-gray-600">
                                    Borrow books from a wide range of genres and
                                    subjects.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 border rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Reading Programs
                                </h3>
                                <p className="mt-4 text-gray-600">
                                    Join our reading programs and improve your
                                    literacy skills.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center border">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Community Events
                                </h3>
                                <p className="mt-4 text-gray-600">
                                    Participate in community events and cultural
                                    activities.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-gray-800 py-8">
                    <div className="container mx-auto px-4 text-center text-white">
                        <p>&copy; 2024 Kampung Library. All rights reserved.</p>
                        <div className="mt-4">
                            <Link
                                href="/"
                                className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-white/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </MaxWidthWrapper>
    );
}
