<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && in_array(auth()->user()->role, ['admin', 'staff']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => 'required|in:pending,confirmed,picked_up,processing,washing,drying,ironing,ready_for_delivery,out_for_delivery,completed,cancelled',
            'staff_notes' => 'nullable|string|max:1000',
            'assigned_staff_id' => 'nullable|exists:users,id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'status.required' => 'Please select a status.',
            'status.in' => 'The selected status is invalid.',
            'assigned_staff_id.exists' => 'The selected staff member is invalid.',
        ];
    }
}