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
import MemberAtoms from "@/Atoms/Volunteer/member";

const CreateOrEditMember = () => {
    /**
     * === STATES ===
     */
    const setShowCreateOrEditMemberDialog = useSetRecoilState(
        MemberAtoms.showCreateOrEditMemberDialogState
    );
    const [isEditingMember, setIsEditingMember] = useRecoilState(
        MemberAtoms.isEditingMemberState
    );
    const [globalMember, setGlobalMember] = useRecoilState(
        MemberAtoms.globalMemberState
    );

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        ic_no: "",
        address: "",
    });

    /**
     * === FUNCTIONS ===
     */

    /**
     * ON VALUES SUBMIT
     */
    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        isEditingMember
            ? patch(route("volunteer:member:update", globalMember?.id), {
                  onSuccess: () => {
                      setShowCreateOrEditMemberDialog(false);
                      setIsEditingMember(false);
                      reset();
                      toast({
                          variant: "default",
                          description: "Member updated successfully",
                      });
                  },
                  onError: (error) => {
                      toast({
                          variant: "destructive",
                          description: "Member update failed. Try again.",
                      });
                  },
              })
            : post(route("volunteer:member:create"), {
                  onSuccess: () => {
                      setShowCreateOrEditMemberDialog(false);
                      setIsEditingMember(false);
                      reset();
                      toast({
                          variant: "default",
                          description: "Member created successfully",
                      });
                  },

                  onError: (errors) => {
                      toast({
                          variant: "destructive",
                          description: "Member creation failed. Try again.",
                      });
                  },
              });
    };

    /**
     * RESET FORM WHEN EDITING
     */
    React.useEffect(() => {
        if (isEditingMember && globalMember) {
            setData({
                email: globalMember?.email,
                name: globalMember?.name,
                phone: globalMember?.phone,
                address: globalMember?.address,
                ic_no: globalMember?.ic_no,
            });
        }
    }, [isEditingMember, globalMember]);

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    {isEditingMember ? "Edit Member" : "Create Member"}
                </DialogTitle>

                <DialogDescription>
                    Fill the form below. Submit when you're done.
                </DialogDescription>

                <DialogClose
                    onClose={() => {
                        setShowCreateOrEditMemberDialog(false);
                        setGlobalMember(null);
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
                    <Label htmlFor="ic_no">IC NO</Label>

                    <Input
                        id="ic_no"
                        name="ic_no"
                        type="number"
                        placeholder="ic no"
                        value={data.ic_no}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("ic_no", e.target.value)}
                        required
                    />

                    <InputError message={errors.ic_no} className="mt-2" />
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

                <div>
                    <Label htmlFor="address">Address</Label>

                    <Input
                        id="address"
                        name="address"
                        type="address"
                        placeholder="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("address", e.target.value)}
                        required
                    />

                    <InputError message={errors.address} className="mt-2" />
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        className="mt-3"
                        disabled={processing}
                    >
                        {isEditingMember ? (
                            processing ? (
                                <Loading title="updating..." />
                            ) : (
                                "Save changes"
                            )
                        ) : processing ? (
                            <Loading title="creating..." />
                        ) : (
                            "Create member"
                        )}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default CreateOrEditMember;
