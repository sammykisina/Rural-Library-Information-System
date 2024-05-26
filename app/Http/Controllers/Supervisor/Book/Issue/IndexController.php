<?php

namespace App\Http\Controllers\Supervisor\Book\Issue;

use App\Concerns\HasInertiaResponse;
use App\Http\Resources\IssueResource;
use App\Models\Issue;
use Illuminate\Http\Request;

class IndexController
{
    use HasInertiaResponse;

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $issues = Issue::query()
            ->with(['borrower', 'book'])
            ->latest()
            ->get();

        return $this->response->render(
            component: 'Supervisor/Issues/Index',
            props: [
                'issues' => IssueResource::collection(
                    resource: $issues
                ),
            ]
        );
    }
}
