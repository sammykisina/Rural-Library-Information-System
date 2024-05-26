<?php

namespace App\Services\Supervisor;

use App\Enums\UserTypes;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class VolunteerService
{
    /**
     * CREATE A VOLUNTEER
     */
    public function create(array $volunteer_data): User
    {
        return User::create([
            'name' => $volunteer_data['name'],
            'email' => $volunteer_data['email'],
            'phone' => $volunteer_data['phone'],
            'password' => Hash::make(
                value: $volunteer_data['email']
            ),
            'role' => UserTypes::VOLUNTEER->value,
        ]);
    }

    /**
     * UPDATE A VOLUNTEER
     */
    public function update(User $user, array $volunteer_data): bool
    {
        return $user->update([
            'name' => $volunteer_data['name'],
            'email' => $volunteer_data['email'],
            'phone' => $volunteer_data['phone'],
        ]);
    }
}
