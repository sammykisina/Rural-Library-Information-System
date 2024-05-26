import { Head } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Label } from "@/Components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Icons } from "@/Components/partials/icons";
import BookCategoryDistribution from "@/Components/partials/shared/book-category-distibution";
import SupervisorLayout from "@/Layouts/supervisor-layout";

export default function Dashboard({
    categoriesWithBookCountArray,
    available_books,
    active_members,
    borrowed_books,
    returned_books,
}: {
    categoriesWithBookCountArray: { name: string; total: number }[];
    available_books: number;
    active_members: number;
    borrowed_books: number;
    returned_books: number;
}) {
    return (
        <SupervisorLayout>
            <Head title="Dashboard" />

            <div
                className={cn(
                    "h-fit w-full flex-1 space-y-4 bg-card px-1 pb-3 pt-1 text-card-foreground"
                )}
            >
                <div className="flex flex-col  justify-start space-y-2 px-1 md:flex-row">
                    <Label className="text-balance text-center text-3xl font-semibold leading-none tracking-tight">
                        Dashboard
                    </Label>
                </div>

                <div className="grid gap-4 xs:grid-cols-2">
                    <Card className="inline-flex h-[6rem] items-center rounded-xl px-2.5 font-medium capitalize  ring-1 ring-inset ring-primary/50">
                        <CardContent className="flex w-full items-center justify-between py-2">
                            <div className="flex flex-1 flex-col justify-between">
                                <span className="flex flex-1 items-center  text-2xl font-extrabold tracking-wider">
                                    {available_books?.toLocaleString()}
                                </span>
                                <span className="text-2xl text-emerald-900">
                                    Available Books
                                </span>
                            </div>

                            <Icons.books className="h-10 w-10 rounded-lg p-2 text-emerald-700 shadow-md ring-1 ring-inset ring-emerald-600/20" />
                        </CardContent>
                    </Card>

                    <Card className="inline-flex h-[6rem] items-center rounded-xl  px-2.5 font-medium capitalize  ring-1 ring-inset ring-primary/50">
                        <CardContent className="flex w-full items-center justify-between py-2">
                            <div className="flex flex-1 flex-col justify-between">
                                <span className="flex flex-1 items-center  text-2xl font-extrabold tracking-wider">
                                    {active_members?.toLocaleString()}
                                </span>
                                <span className="text-2xl text-blue-900">
                                    Active Members
                                </span>
                            </div>

                            <Icons.users className="h-10 w-10 rounded-lg p-2 text-blue-900 shadow-md ring-1 ring-inset ring-blue-600/20" />
                        </CardContent>
                    </Card>

                    <Card className="inline-flex h-[6rem] items-center rounded-xl  px-2.5 font-medium capitalize ring-1 ring-inset ring-primary/50">
                        <CardContent className="flex w-full items-center justify-between py-2">
                            <div className="flex flex-1 flex-col justify-between">
                                <span className="flex flex-1 items-center  text-2xl font-extrabold tracking-wider">
                                    {borrowed_books?.toLocaleString()}
                                </span>
                                <span className="text-2xl text-yellow-900">
                                    Borrowed Books
                                </span>
                            </div>

                            <Icons.arrowUpFromLine className="h-10 w-10 rounded-lg p-2 text-yellow-900 shadow-md ring-1 ring-inset ring-yellow-600/20" />
                        </CardContent>
                    </Card>

                    <Card className="inline-flex h-[6rem] items-center rounded-xl  px-2.5 font-medium capitalize  ring-1 ring-inset ring-primary/50">
                        <CardContent className="flex w-full items-center justify-between py-2">
                            <div className="flex flex-1 flex-col justify-between">
                                <span className="flex flex-1 items-center  text-2xl font-extrabold tracking-wider">
                                    {returned_books?.toLocaleString()}
                                </span>
                                <span className="text-2xl text-rose-900">
                                    {" "}
                                    Returned Books
                                </span>
                            </div>

                            <Icons.arrowDownFromLine className="h-10 w-10 rounded-lg p-2 text-rose-900 shadow-md ring-1 ring-inset ring-rose-600/20" />
                        </CardContent>
                    </Card>
                </div>

                <Card className="ring-1 ring-inset ring-emerald-600/20 md:col-span-4">
                    <CardHeader>
                        <CardTitle>Books Category Distribution</CardTitle>
                        <CardDescription>
                            Hover to view how many books are in each category
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="border-t border-emerald-600/20">
                        <BookCategoryDistribution
                            bookCategoryDistributions={
                                categoriesWithBookCountArray
                            }
                        />
                    </CardContent>
                </Card>
            </div>
        </SupervisorLayout>
    );
}
