<?php

namespace App\Http\Controllers\Supervisor\Book;

use App\Concerns\HasInertiaResponse;
use App\Http\Resources\BookResource;
use App\Http\Resources\CategoryResource;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;

class IndexController
{
    use HasInertiaResponse;

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $books = Book::query()
            ->with(['category'])
            ->latest()
            ->get();

        $categories = Category::query()->latest()->get();

        return $this->response->render(
            component: 'Supervisor/Books/Index',
            props: [
                'books' => BookResource::collection(
                    resource: $books
                ),
                'categories' => CategoryResource::collection(
                    resource: $categories
                ),
            ]
        );
    }
}
