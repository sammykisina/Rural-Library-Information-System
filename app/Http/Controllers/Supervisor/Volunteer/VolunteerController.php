<?php

namespace App\Http\Controllers\Supervisor\Volunteer;

use App\Http\Requests\VolunteerRequest;
use App\Models\User;
use App\Services\Supervisor\VolunteerService;
use Illuminate\Http\RedirectResponse;

class VolunteerController
{
    public function __construct(
        public VolunteerService $volunteerService
    ) {
    }

    public function createVolunteer(VolunteerRequest $request)
    {
        $volunteer = $this->volunteerService->create(
            volunteer_data: $request->validated()
        );

        if ($volunteer) {

            return new RedirectResponse(
                url: action(
                    IndexController::class
                )
            );
        }

        return redirect()->back()->withErrors([
            'error' => 'Something went wrong. Please try again.',
        ]);
    }

    public function updateVolunteer(VolunteerRequest $request, User $user)
    {
        if ($this->volunteerService->update(
            user: $user,
            volunteer_data: $request->validated()
        )) {
            return new RedirectResponse(
                url: action(
                    IndexController::class
                )
            );
        }

        return redirect()->back()->withErrors([
            'error' => 'Something went wrong. Please try again.',
        ]);
    }
}
