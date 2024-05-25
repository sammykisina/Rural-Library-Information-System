import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import VolunteerLayout from "@/Layouts/volunteer-layout";
import SupervisorLayout from "@/Layouts/supervisor-layout";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return auth?.user?.role === "volunteer" ? (
        <VolunteerLayout>
            <Head title="Profile" />

            <div className="py-12 md:ml-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg border">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg border">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg border">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </VolunteerLayout>
    ) : auth?.user?.role === "supervisor" ? (
        <SupervisorLayout>
            <Head title="Profile" />

            <div className="py-12 md:ml-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg border">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl "
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg border">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg border">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </SupervisorLayout>
    ) : null;
}
