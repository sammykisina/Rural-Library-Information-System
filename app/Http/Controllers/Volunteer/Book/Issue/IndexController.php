<?php

namespace App\Http\Controllers\Volunteer\Book\Issue;

use App\Concerns\HasInertiaResponse;
use App\Enums\BookStatuses;
use App\Enums\UserTypes;
use App\Http\Resources\BookResource;
use App\Http\Resources\IssueResource;
use App\Http\Resources\UserResource;
use App\Models\Book;
use App\Models\Issue;
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
        $issues = Issue::query()
            ->with(['borrower', 'book'])
            ->latest()
            ->get();

        $books = Book::query()
            ->where('status', BookStatuses::AVAILABLE->value)
            ->get();

        $members = User::query()->where('role', UserTypes::MEMBER->value)
            ->latest()
            ->get();

        return $this->response->render(
            component: 'Volunteer/Issues/Index',
            props: [
                'issues' => IssueResource::collection(
                    resource: $issues
                ),
                'books' => BookResource::collection(
                    resource: $books
                ),
                'members' => UserResource::collection(
                    resource: $members
                ),
            ]
        );
    }
}
