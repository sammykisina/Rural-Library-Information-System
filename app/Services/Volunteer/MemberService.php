<?php

namespace App\Services\Volunteer;

use App\Enums\UserTypes;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class MemberService
{
    /**
     * CREATE A MEMBER
     */
    public function create(array $member_data): User
    {
        return User::create([
            'name' => $member_data['name'],
            'email' => $member_data['email'],
            'phone' => $member_data['phone'],
            'ic_no' => $member_data['ic_no'],
            'address' => $member_data['address'],
            'password' => Hash::make(
                value: $member_data['email']
            ),
            'role' => UserTypes::MEMBER->value,
        ]);
    }

    /**
     * UPDATE A MEMBER
     */
    public function update(User $user, array $member_data): bool
    {
        return $user->update([
            'name' => $member_data['name'],
            'email' => $member_data['email'],
            'phone' => $member_data['phone'],
            'ic_no' => $member_data['ic_no'],
            'address' => $member_data['address'],
        ]);
    }
}
