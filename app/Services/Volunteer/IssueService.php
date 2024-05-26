<?php

namespace App\Services\Volunteer;

use App\Enums\BookStatuses;
use App\Models\Issue;
use Carbon\Carbon;

class IssueService
{
    /**
     * CREATE A ISSUE
     */
    public function create(array $issue_data): Issue
    {
        return Issue::create([
            'user_id' => $issue_data['user_id'],
            'book_id' => $issue_data['book_id'],
            'return_date' => Carbon::now()->addDays(5),
            'status' => BookStatuses::AWAITING_RETURN->value,
        ]);
    }

    /**
     * UPDATE A ISSUE
     */
    public function update(Issue $issue): bool
    {
        return $issue->update([
            'date_returned' => Carbon::now(),
            'status' => BookStatuses::RETURNED->value,
        ]);
    }
}
