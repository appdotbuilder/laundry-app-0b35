<?php

namespace Database\Factories;

use App\Models\LaundryService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LaundryService>
 */
class LaundryServiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\LaundryService>
     */
    protected $model = LaundryService::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $services = [
            [
                'name' => 'Wash & Fold',
                'description' => 'Regular wash and fold service for everyday clothes. Includes washing, drying, and folding.',
                'pricing_type' => 'per_kg',
                'price_per_kg' => 15.00,
                'turnaround_hours' => 24,
            ],
            [
                'name' => 'Dry Cleaning',
                'description' => 'Professional dry cleaning for delicate fabrics, suits, and formal wear.',
                'pricing_type' => 'per_piece',
                'price_per_piece' => 25.00,
                'turnaround_hours' => 48,
            ],
            [
                'name' => 'Ironing & Pressing',
                'description' => 'Professional ironing and pressing service for wrinkle-free clothes.',
                'pricing_type' => 'per_piece',
                'price_per_piece' => 8.00,
                'turnaround_hours' => 12,
            ],
            [
                'name' => 'Premium Wash & Fold',
                'description' => 'Premium wash and fold with fabric softener and special care for delicate items.',
                'pricing_type' => 'per_kg',
                'price_per_kg' => 22.00,
                'turnaround_hours' => 24,
            ],
            [
                'name' => 'Express Service',
                'description' => 'Same-day express laundry service for urgent needs.',
                'pricing_type' => 'per_kg',
                'price_per_kg' => 30.00,
                'turnaround_hours' => 6,
            ],
        ];

        static $index = 0;
        $service = $services[$index % count($services)];
        $index++;

        return [
            'name' => $service['name'],
            'description' => $service['description'],
            'price_per_kg' => $service['pricing_type'] === 'per_kg' ? $service['price_per_kg'] : null,
            'price_per_piece' => $service['pricing_type'] === 'per_piece' ? $service['price_per_piece'] : null,
            'pricing_type' => $service['pricing_type'],
            'turnaround_hours' => $service['turnaround_hours'],
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the service is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}