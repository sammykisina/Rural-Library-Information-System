<?php

namespace App\Http\Controllers\Volunteer\Book;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Services\Volunteer\CategoryService;
use Illuminate\Http\RedirectResponse;

class CategoryController
{
    public function __construct(
        public CategoryService $categoryService
    ) {
    }

    public function createCategory(CategoryRequest $request)
    {
        $category = $this->categoryService->create(
            category_data: $request->validated()
        );

        if ($category) {

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

    public function updateCategory(CategoryRequest $request, Category $category)
    {
        if ($this->categoryService->update(
            category: $category,
            category_data: $request->validated()
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
