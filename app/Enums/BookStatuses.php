<?php

namespace App\Enums;

enum BookStatuses: string
{
    case AWAITING_RETURN = 'awaiting return';
    case RETURNED = 'returned';
    case LOST = 'lost';
    case AVAILABLE = 'available';
    case BORROWED = 'borrowed';
}
