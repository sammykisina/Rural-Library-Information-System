<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VolunteerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
            ],
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($this->user ? $this->user->id : ''),
            ],
            'phone' => [
                'required',
                'string',
                Rule::unique('users', 'phone')->ignore($this->user ? $this->user->id : ''),
            ],
        ];
    }
}
