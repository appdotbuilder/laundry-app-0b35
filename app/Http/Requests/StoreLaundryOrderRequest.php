<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLaundryOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->role === 'customer';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'laundry_service_id' => 'required|exists:laundry_services,id',
            'quantity' => 'required|numeric|min:0.1|max:100',
            'special_instructions' => 'nullable|string|max:1000',
            'pickup_date' => 'required|date|after:now',
            'delivery_date' => 'required|date|after:pickup_date',
            'pickup_address' => 'required|string|max:500',
            'delivery_address' => 'required|string|max:500',
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
            'laundry_service_id.required' => 'Please select a laundry service.',
            'laundry_service_id.exists' => 'The selected service is not available.',
            'quantity.required' => 'Please specify the quantity.',
            'quantity.numeric' => 'Quantity must be a number.',
            'quantity.min' => 'Minimum quantity is 0.1.',
            'quantity.max' => 'Maximum quantity is 100.',
            'pickup_date.required' => 'Please select a pickup date.',
            'pickup_date.after' => 'Pickup date must be in the future.',
            'delivery_date.required' => 'Please select a delivery date.',
            'delivery_date.after' => 'Delivery date must be after pickup date.',
            'pickup_address.required' => 'Pickup address is required.',
            'delivery_address.required' => 'Delivery address is required.',
        ];
    }
}