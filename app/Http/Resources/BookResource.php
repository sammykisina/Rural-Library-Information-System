<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
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
            'title' => $this->title,
            'status' => $this->status,
            'author' => $this->author,
            'category' => new CategoryResource(
                resource: $this->whenLoaded(
                    relationship: 'category'
                )
            ),
            'publication_year' => $this->publication_year,
            'publisher' => $this->publisher,
            'isbn' => $this->isbn,
            'created_at' => new DateResource(
                resource: $this->created_at
            ),
        ];
    }
}
