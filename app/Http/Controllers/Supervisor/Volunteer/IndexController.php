<?php

namespace App\Http\Controllers\Supervisor\Volunteer;

use App\Concerns\HasInertiaResponse;
use App\Enums\UserTypes;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class IndexController
{
    use HasInertiaResponse;

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $volunteers = User::query()->where('role', UserTypes::VOLUNTEER->value)
            ->latest()
            ->get();

        return $this->response->render(
            component: 'Supervisor/Volunteers/Index',
            props: [
                'volunteers' => UserResource::collection(
                    resource: $volunteers
                ),
            ]
        );
    }
}
