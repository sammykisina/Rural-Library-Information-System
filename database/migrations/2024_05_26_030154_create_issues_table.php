<?php

use App\Enums\BookStatuses;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('issues', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->index()
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('book_id')
                ->index()
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('status')->default(BookStatuses::AWAITING_RETURN->value);
            $table->timestamp('return_date');
            $table->timestamp('date_returned')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('issues');
    }
};
