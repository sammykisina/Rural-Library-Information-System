<?php

namespace App\Http\Controllers;

use App\Concerns\HasInertiaResponse;
use App\Enums\BookStatuses;
use App\Enums\UserTypes;
use App\Models\Book;
use App\Models\Category;
use App\Models\Issue;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    use HasInertiaResponse;

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $categoriesWithBookCount = Category::query()->withCount('books')->get();
        $categoriesWithBookCountArray = $categoriesWithBookCount->map(function ($category) {
            return [
                'name' => $category->name,
                'total' => $category->books_count,
            ];
        })->toArray();

        $available_books = Book::query()->count();
        $active_members = User::query()->where('role', UserTypes::MEMBER->value)->count();
        $borrowed_books = Issue::query()->where('status', BookStatuses::AWAITING_RETURN->value)->count();
        $returned_books = Issue::query()->where('status', BookStatuses::RETURNED->value)->count();

        if (auth()->user()->role === UserTypes::VOLUNTEER->value) {
            return $this->response->render(
                component: 'Volunteer/Dashboard',
                props: [
                    'categoriesWithBookCountArray' => $categoriesWithBookCountArray,
                    'available_books' => $available_books,
                    'active_members' => $active_members,
                    'borrowed_books' => $borrowed_books,
                    'returned_books' => $returned_books,
                ]
            );
        }

        if (auth()->user()->role === UserTypes::SUPERVISOR->value) {
            return $this->response->render(
                component: 'Supervisor/Dashboard',
                props: [
                    'categoriesWithBookCountArray' => $categoriesWithBookCountArray,
                    'available_books' => $available_books,
                    'active_members' => $active_members,
                    'borrowed_books' => $borrowed_books,
                    'returned_books' => $returned_books,
                ]
            );
        }
    }
}
