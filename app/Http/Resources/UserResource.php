<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    // public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'ic_no' => $this->ic_no,

            'name' => $this->name,
            'email' => $this->email,

            'phone' => $this->phone,
            'address' => $this->address,
            'created_at' => new DateResource(
                resource: $this->created_at
            ),

            'role' => $this->role,
        ];
    }
}
