<?php

namespace App\Enums;

enum UserTypes: string
{
    case SUPERVISOR = 'supervisor';
    case VOLUNTEER = 'volunteer';
    case MEMBER = 'member';
}
