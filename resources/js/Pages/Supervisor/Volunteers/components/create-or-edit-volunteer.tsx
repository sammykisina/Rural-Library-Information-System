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
import VolunteerAtoms from "@/Atoms/Supervisor/volunteer";
import Loading from "@/Components/partials/loading";

/**
 * TYPES
 */
// type VolunteerPro = {
//     units: Unit[];
// };

const CreateOrEditVolunteer = () => {
    /**
     * === STATES ===
     */
    const setShowCreateOrEditVolunteerDialog = useSetRecoilState(
        VolunteerAtoms.showCreateOrEditVolunteerDialogState
    );
    const [isEditingVolunteer, setIsEditingVolunteer] = useRecoilState(
        VolunteerAtoms.isEditingVolunteerState
    );
    const [globalVolunteer, setGlobalVolunteer] = useRecoilState(
        VolunteerAtoms.globalVolunteerState
    );

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
    });

    /**
     * === FUNCTIONS ===
     */

    /**
     * ON VALUES SUBMIT
     */
    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        isEditingVolunteer
            ? patch(route("supervisor:volunteer:update", globalVolunteer?.id), {
                  onSuccess: () => {
                      setShowCreateOrEditVolunteerDialog(false);
                      setIsEditingVolunteer(false);
                      reset();
                      toast({
                          variant: "default",
                          description: "Volunteer updated successfully",
                      });
                  },
                  onError: (error) => {
                      toast({
                          variant: "destructive",
                          description: "Volunteer update failed. Try again.",
                      });
                  },
              })
            : post(route("supervisor:volunteer:create"), {
                  onSuccess: () => {
                      setShowCreateOrEditVolunteerDialog(false);
                      setIsEditingVolunteer(false);
                      reset();
                      toast({
                          variant: "default",
                          description: "Volunteer created successfully",
                      });
                  },

                  onError: (errors) => {
                      toast({
                          variant: "destructive",
                          description: "Volunteer creation failed. Try again.",
                      });
                  },
              });
    };

    /**
     * RESET FORM WHEN EDITING
     */
    React.useEffect(() => {
        if (isEditingVolunteer && globalVolunteer) {
            setData({
                email: globalVolunteer?.email,
                name: globalVolunteer?.name,
                phone: globalVolunteer?.phone,
            });
        }
    }, [isEditingVolunteer, globalVolunteer]);

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    {isEditingVolunteer ? "Edit Volunteer" : "Create Volunteer"}
                </DialogTitle>

                <DialogDescription>
                    Fill the form below. Submit when you're done.
                </DialogDescription>

                <DialogClose
                    onClose={() => {
                        setShowCreateOrEditVolunteerDialog(false);
                        setGlobalVolunteer(null);
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

                <div>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="phone">Phone</Label>

                    <Input
                        id="phone"
                        name="phone"
                        type="phone"
                        placeholder="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("phone", e.target.value)}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        className="mt-3"
                        disabled={processing}
                    >
                        {isEditingVolunteer ? (
                            processing ? (
                                <Loading title="updating..." />
                            ) : (
                                "Save changes"
                            )
                        ) : processing ? (
                            <Loading title="creating..." />
                        ) : (
                            "Create volunteer"
                        )}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default CreateOrEditVolunteer;
