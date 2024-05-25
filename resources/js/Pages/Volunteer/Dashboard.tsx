import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import VolunteerLayout from "@/Layouts/volunteer-layout";

export default function Dashboard({ auth }: PageProps) {
    return (
        <VolunteerLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in as Volunteer
                            <span>{auth?.user?.email}</span>
                            <span>{auth?.user?.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </VolunteerLayout>
    );
}
