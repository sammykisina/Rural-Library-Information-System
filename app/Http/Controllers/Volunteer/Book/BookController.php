<?php

namespace App\Http\Controllers\Volunteer\Book;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use App\Services\Volunteer\BookService;
use Illuminate\Http\RedirectResponse;

class BookController
{
    public function __construct(
        public BookService $bookService
    ) {
    }

    public function createBook(BookRequest $request)
    {
        $book = $this->bookService->create(
            book_data: $request->validated()
        );

        if ($book) {

            return new RedirectResponse(
                url: action(
                    IndexController::class
                )
            );
        }

        return redirect()->back()->withErrors([
            'error' => 'Something went wrong. Please try again.',
        ]);
    }

    public function updateBook(BookRequest $request, Book $book)
    {
        if ($this->bookService->update(
            book: $book,
            book_data: $request->validated()
        )) {
            return new RedirectResponse(
                url: action(
                    IndexController::class
                )
            );
        }

        return redirect()->back()->withErrors([
            'error' => 'Something went wrong. Please try again.',
        ]);
    }
}
