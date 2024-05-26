import { useForm } from "@inertiajs/react";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Separator } from "@/Components/ui/separator";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { toast } from "@/Components/ui/use-toast";
import Loading from "@/Components/partials/loading";
import BookAtoms from "@/Atoms/Volunteer/book/book";
import { Category } from "@/types/book";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

const CreateOrEditBook = ({ categories }: { categories: Category[] }) => {
    /**
     * === STATES ===
     */
    const setShowCreateOrEditBookDialog = useSetRecoilState(
        BookAtoms.showCreateOrEditBookDialogState
    );
    const [isEditingBook, setIsEditingBook] = useRecoilState(
        BookAtoms.isEditingBookState
    );
    const [globalBook, setGlobalBook] = useRecoilState(
        BookAtoms.globalBookState
    );

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        title: "",
        isbn: "",
        author: "",
        publisher: "",
        publication_year: "",
        category_id: "",
    });

    /**
     * === FUNCTIONS ===
     */

    /**
     * ON VALUES SUBMIT
     */
    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        isEditingBook
            ? patch(route("volunteer:book:update", globalBook?.id), {
                  onSuccess: () => {
                      setShowCreateOrEditBookDialog(false);
                      setIsEditingBook(false);
                      reset();
                      toast({
                          variant: "default",
                          description: "Book updated successfully",
                      });
                  },
                  onError: (error) => {
                      toast({
                          variant: "destructive",
                          description: "Book update failed. Try again.",
                      });
                  },
              })
            : post(route("volunteer:book:create"), {
                  onSuccess: () => {
                      setShowCreateOrEditBookDialog(false);
                      setIsEditingBook(false);
                      reset();
                      toast({
                          variant: "default",
                          description: "Book created successfully",
                      });
                  },

                  onError: (errors) => {
                      console.log("errors", errors);

                      toast({
                          variant: "destructive",
                          description: "Book creation failed. Try again.",
                      });
                  },
              });
    };

    /**
     * RESET FORM WHEN EDITING
     */
    React.useEffect(() => {
        if (isEditingBook && globalBook) {
            setData({
                title: globalBook?.title,
                author: globalBook?.author,
                category_id: String(globalBook?.category?.id),
                isbn: globalBook?.isbn,
                publication_year: globalBook?.publication_year,
                publisher: globalBook?.publisher,
            });
        }
    }, [isEditingBook, globalBook]);

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    {isEditingBook ? "Edit Book" : "Create Book"}
                </DialogTitle>

                <DialogDescription>
                    Fill the form below. Submit when you're done.
                </DialogDescription>

                <DialogClose
                    onClose={() => {
                        setShowCreateOrEditBookDialog(false);
                        setGlobalBook(null);
                    }}
                />
            </DialogHeader>

            <Separator />

            <form onSubmit={submit} className="space-y-2">
                <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                        <Label htmlFor="title">Title</Label>

                        <Input
                            id="title"
                            name="title"
                            placeholder="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("title", e.target.value)}
                            required
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="isbn">ISBN</Label>

                        <Input
                            id="isbn"
                            name="isbn"
                            placeholder="isbn"
                            value={data.isbn}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("isbn", e.target.value)}
                            required
                        />

                        <InputError message={errors.isbn} className="mt-2" />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                        <Label htmlFor="author">Author</Label>

                        <Input
                            id="author"
                            name="author"
                            placeholder="author"
                            value={data.author}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("author", e.target.value)}
                            required
                        />

                        <InputError message={errors.author} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="publisher">Publisher</Label>

                        <Input
                            id="publisher"
                            name="publisher"
                            placeholder="publisher"
                            value={data.publisher}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("publisher", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.publisher}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                        <Label htmlFor="publication_year">
                            Publication Year
                        </Label>

                        <Input
                            id="publication_year"
                            name="publication_year"
                            placeholder="publication year"
                            value={data.publication_year}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("publication_year", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.publication_year}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                        <Label htmlFor="category_id">Category</Label>

                        <Select
                            value={data.category_id}
                            onValueChange={(value) =>
                                setData("category_id", value)
                            }
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    {categories?.map((category, index) => (
                                        <SelectItem
                                            key={index}
                                            value={String(category?.id)}
                                        >
                                            {category?.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <InputError
                            message={errors.category_id}
                            className="mt-2"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        className="mt-3"
                        disabled={processing}
                    >
                        {isEditingBook ? (
                            processing ? (
                                <Loading title="updating..." />
                            ) : (
                                "Save changes"
                            )
                        ) : processing ? (
                            <Loading title="creating..." />
                        ) : (
                            "Create book"
                        )}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default CreateOrEditBook;
