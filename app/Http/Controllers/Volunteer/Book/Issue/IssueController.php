<?php

namespace App\Http\Controllers\Volunteer\Book\Issue;

use App\Enums\BookStatuses;
use App\Models\Book;
use App\Models\Issue;
use App\Models\User;
use App\Services\Volunteer\BookService;
use App\Services\Volunteer\IssueService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IssueController
{
    public function __construct(
        public IssueService $issueService,
        public BookService $bookService
    ) {
    }

    public function createIssue(Request $request, Book $book, User $user)
    {
        DB::transaction(function () use ($user, $book) {
            $this->issueService->create(
                issue_data: [
                    'book_id' => $book->id,
                    'user_id' => $user->id,
                ]
            );

            $this->bookService->updateBookStatus(
                book: $book,
                status: BookStatuses::BORROWED->value
            );

        });

        return new RedirectResponse(
            url: action(
                IndexController::class
            )
        );

    }

    public function updateIssue(Request $request, Issue $issue)
    {
        DB::transaction(function () use ($issue) {
            $this->issueService->update(
                issue: $issue,
            );

            $this->bookService->updateBookStatus(
                book: $issue->book,
                status: BookStatuses::AVAILABLE->value
            );

        });

        return new RedirectResponse(
            url: action(
                IndexController::class
            )
        );

    }
}
