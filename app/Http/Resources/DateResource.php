<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read CarbonInterface $resource
 */
final class DateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'human' => $this->resource->diffForHumans(),
            'string' => $this->resource->isoFormat('MMM Do YYYY'),
        ];
    }
}