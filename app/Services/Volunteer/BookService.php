<?php

namespace App\Services\Volunteer;

use App\Models\Book;

class BookService
{
    /**
     * CREATE A BOOK
     */
    public function create(array $book_data): Book
    {
        return Book::create([
            'title' => $book_data['title'],
            'author' => $book_data['author'],
            'publisher' => $book_data['publisher'],
            'isbn' => $book_data['isbn'],
            'publication_year' => $book_data['publication_year'],
            'category_id' => $book_data['category_id'],
        ]);
    }

    /**
     * UPDATE A BOOK
     */
    public function update(Book $book, array $book_data): bool
    {
        return $book->update([
            'title' => $book_data['title'],
            'author' => $book_data['author'],
            'publisher' => $book_data['publisher'],
            'isbn' => $book_data['isbn'],
            'publication_year' => $book_data['publication_year'],
            'category_id' => $book_data['category_id'],
        ]);
    }

    /**
     * UPDATE BOOK STATUS
     */
    public function updateBookStatus(Book $book, string $status): bool
    {
        return $book->update([
            'status' => $status,
        ]);
    }
}
