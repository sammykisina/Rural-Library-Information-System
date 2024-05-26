<?php

use App\Http\Controllers;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Supervisor\Book\IndexController as BookIndexController;
use App\Http\Controllers\Supervisor\Book\Issue\IndexController as IssueIndexController;
use App\Http\Controllers\Supervisor\Member\IndexController;
use App\Http\Controllers\Supervisor\Volunteer;
use App\Http\Controllers\Volunteer\Book;
use App\Http\Controllers\Volunteer\Member;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/supervisor/dashboard', Controllers\DashboardController::class)->middleware(['auth'])->name('supervisor:dashboard');

Route::get('/volunteer/dashboard', Controllers\DashboardController::class)->middleware(['auth'])->name('volunteer:dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('verified')->prefix('supervisor')->as('supervisor:')->group(function () {
        Route::get('/volunteers', Volunteer\IndexController::class)->name('volunteer:index');
        Route::post('/volunteers', [Volunteer\VolunteerController::class, 'createVolunteer'])->name('volunteer:create');
        Route::patch('/volunteers/{user}', [Volunteer\VolunteerController::class, 'updateVolunteer'])->name('volunteer:update');

        Route::get('/members', IndexController::class)->name('members:index');
        Route::get('/books', BookIndexController::class)->name('books:index');

        Route::get('/books/issues', IssueIndexController::class)->name('book:issue:index');
    });

    Route::middleware('verified')->prefix('volunteer')->as('volunteer:')->group(function () {
        Route::get('/members', Member\IndexController::class)->name('member:index');
        Route::post('/members', [Member\MemberController::class, 'createMember'])->name('member:create');
        Route::patch('/members/{user}', [Member\MemberController::class, 'updateMember'])->name('member:update');

        Route::get('/books', Book\IndexController::class)->name('book:index');
        Route::post('/books', [Book\BookController::class, 'createBook'])->name('book:create');
        Route::patch('/books/{book}', [Book\BookController::class, 'updateBook'])->name('book:update');

        Route::post('/categories', [Book\CategoryController::class, 'createCategory'])->name('category:create');
        Route::patch('/categories/{category}', [Book\CategoryController::class, 'updateCategory'])->name('category:update');

        Route::get('/books/issues', Book\Issue\IndexController::class)->name('book:issue:index');
        Route::post('/books/{book}/{user}/issues', [Book\Issue\IssueController::class, 'createIssue'])->name('book:issue:create');
        Route::patch('/books/issues/{issue}', [Book\Issue\IssueController::class, 'updateIssue'])->name('book:issue:update');
    });
});

require __DIR__.'/auth.php';
