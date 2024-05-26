<?php

namespace App\Http\Controllers\Volunteer\Member;

use App\Http\Requests\MemberRequest;
use App\Models\User;
use App\Services\Volunteer\MemberService;
use Illuminate\Http\RedirectResponse;

class MemberController
{
    public function __construct(
        public MemberService $memberService
    ) {
    }

    public function createMember(MemberRequest $request)
    {
        $member = $this->memberService->create(
            member_data: $request->validated()
        );

        if ($member) {

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

    public function updateMember(MemberRequest $request, User $user)
    {
        if ($this->memberService->update(
            user: $user,
            member_data: $request->validated()
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
