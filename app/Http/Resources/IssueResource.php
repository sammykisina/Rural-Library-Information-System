<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IssueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'book' => new BookResource(
                resource: $this->whenLoaded(
                    relationship: 'book'),
            ),
            'borrower' => new UserResource(
                resource: $this->whenLoaded(
                    relationship: 'borrower'),
            ),
            'borrowed_at' => new DateResource(
                resource: $this->created_at
            ),
            'return_date' => new DateResource(
                resource: $this->return_date
            ),
            'date_returned' => new DateResource(
                resource: $this->date_returned
            ),
        ];
    }
}
