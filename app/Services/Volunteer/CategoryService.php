<?php

namespace App\Services\Volunteer;

use App\Models\Category;

class CategoryService
{
    /**
     * CREATE A CATEGORY
     */
    public function create(array $category_data): Category
    {
        return Category::create([
            'name' => $category_data['name'],
        ]);
    }

    /**
     * UPDATE A CATEGORY
     */
    public function update(Category $category, array $category_data): bool
    {
        return $category->update([
            'name' => $category_data['name'],

        ]);
    }
}
