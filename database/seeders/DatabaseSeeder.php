<?php

namespace Database\Seeders;

use App\Enums\UserTypes;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Supervisor',
            'email' => 'supervisor@example.com',
            'role' => UserTypes::SUPERVISOR->value,
        ]);

        User::factory()->create([
            'name' => 'volunteer',
            'email' => 'volunteer@example.com',
            'role' => UserTypes::VOLUNTEER->value,
        ]);
    }
}
