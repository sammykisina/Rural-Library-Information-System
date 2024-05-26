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
import CategoryAtoms from "@/Atoms/Volunteer/book/category";

const CreateOrEditCategory = () => {
    /**
     * === STATES ===
     */
    const setShowCreateOrEditCategoryDialog = useSetRecoilState(
        CategoryAtoms.showCreateOrEditCategoryDialogState
    );
    const [isEditingCategory, setIsEditingCategory] = useRecoilState(
        CategoryAtoms.isEditingCategoryState
    );
    const [globalCategory, setGlobalCategory] = useRecoilState(
        CategoryAtoms.globalCategoryState
    );

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: "",
    });

    /**
     * === FUNCTIONS ===
     */

    /**
     * ON VALUES SUBMIT
     */
    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        isEditingCategory
            ? patch(route("volunteer:category:update", globalCategory?.id), {
                  onSuccess: () => {
                      setShowCreateOrEditCategoryDialog(false);
                      setIsEditingCategory(false);
                      reset();
                      toast({
                          variant: "default",
                          description: "Category updated successfully",
                      });
                  },
                  onError: (error) => {
                      toast({
                          variant: "destructive",
                          description: "Category update failed. Try again.",
                      });
                  },
              })
            : post(route("volunteer:category:create"), {
                  onSuccess: () => {
                      setShowCreateOrEditCategoryDialog(false);
                      setIsEditingCategory(false);
                      reset();
                      toast({
                          variant: "default",
                          description: "Category created successfully",
                      });
                  },

                  onError: (errors) => {
                      toast({
                          variant: "destructive",
                          description: "Category creation failed. Try again.",
                      });
                  },
              });
    };

    /**
     * RESET FORM WHEN EDITING
     */
    React.useEffect(() => {
        if (isEditingCategory && globalCategory) {
            setData({
                name: globalCategory?.name,
            });
        }
    }, [isEditingCategory, globalCategory]);

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    {isEditingCategory ? "Edit Category" : "Create Category"}
                </DialogTitle>

                <DialogDescription>
                    Fill the form below. Submit when you're done.
                </DialogDescription>

                <DialogClose
                    onClose={() => {
                        setShowCreateOrEditCategoryDialog(false);
                        setGlobalCategory(null);
                    }}
                />
            </DialogHeader>

            <Separator />

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="name">Name</Label>

                    <Input
                        id="name"
                        name="name"
                        placeholder="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        className="mt-3"
                        disabled={processing}
                    >
                        {isEditingCategory ? (
                            processing ? (
                                <Loading title="updating..." />
                            ) : (
                                "Save changes"
                            )
                        ) : processing ? (
                            <Loading title="creating..." />
                        ) : (
                            "Create category"
                        )}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default CreateOrEditCategory;
