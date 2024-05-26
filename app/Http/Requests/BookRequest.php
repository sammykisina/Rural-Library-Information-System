<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BookRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
            ],
            'author' => [
                'required',
                'string',
            ],
            'publisher' => [
                'required',
                'string',
            ],
            'isbn' => [
                'required',
                'string',
                Rule::unique('books', 'isbn')->ignore($this->book ? $this->book->id : ''),
            ],
            'publication_year' => [
                'required',
                'string',
            ],
            'category_id' => [
                'required',
                'string',
                'exists:categories,id',
            ],
        ];
    }
}
