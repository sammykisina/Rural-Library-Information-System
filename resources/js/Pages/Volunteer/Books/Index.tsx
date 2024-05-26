import Holder from "@/Components/partials/holder";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import VolunteerLayout from "@/Layouts/volunteer-layout";
import { Book, Category } from "@/types/book";
import { Head } from "@inertiajs/react";

import React from "react";

/**
 * TYPES
 */
type BooksProps = {
    books: Book[];
    categories: Category[];
};

/**
 * LAZY LOADS
 */
const AllBooks = React.lazy(() => import("./components/books"));
const Categories = React.lazy(() => import("./components/categories"));

const Books: React.FC<BooksProps> = ({ books, categories }) => {
    /**
     * === STATES ===
     */
    const tabsData = [
        {
            value: "all-books",
            title: "Books",
            Content: (
                <React.Suspense fallback={<Holder />}>
                    <AllBooks books={books} categories={categories} />
                </React.Suspense>
            ),
        },
        {
            value: "categories",
            title: "Categories",
            Content: (
                <React.Suspense fallback={<Holder />}>
                    <Categories categories={categories} />
                </React.Suspense>
            ),
        },
    ];

    return (
        <>
            <Head title="Books" />
            <VolunteerLayout>
                <Tabs defaultValue={tabsData[0].value} className="relative">
                    <div className="sticky top-[3.3rem] py-1.5 bg-background text-foreground z-40">
                        <ScrollArea className="max-w-full ">
                            <TabsList className="rounded grid grid-cols-2">
                                {tabsData?.map((tab, tabIndex) => (
                                    <TabsTrigger
                                        key={tabIndex}
                                        value={tab?.value}
                                    >
                                        {tab?.title}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    {tabsData?.map((tab, tabIndex) => (
                        <TabsContent
                            key={tabIndex}
                            value={tab?.value}
                            className="px-0 py-1"
                        >
                            {tab.Content}
                        </TabsContent>
                    ))}
                </Tabs>
            </VolunteerLayout>
        </>
    );
};

export default Books;
