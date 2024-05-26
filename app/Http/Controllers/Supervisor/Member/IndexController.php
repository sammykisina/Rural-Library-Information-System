<?php

namespace App\Http\Controllers\Supervisor\Member;

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
        $members = User::query()->where('role', UserTypes::MEMBER->value)
            ->latest()
            ->get();

        return $this->response->render(
            component: 'Supervisor/Members/Index',
            props: [
                'members' => UserResource::collection(
                    resource: $members
                ),
            ]
        );
    }
}
