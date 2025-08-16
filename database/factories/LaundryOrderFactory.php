<?php

namespace Database\Factories;

use App\Models\LaundryOrder;
use App\Models\LaundryService;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LaundryOrder>
 */
class LaundryOrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\LaundryOrder>
     */
    protected $model = LaundryOrder::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $service = LaundryService::inRandomOrder()->first();
        $quantity = $service->pricing_type === 'per_kg' 
            ? $this->faker->randomFloat(1, 1, 15) 
            : $this->faker->numberBetween(1, 10);

        $totalAmount = $quantity * $service->getPrice();

        $pickupDate = $this->faker->dateTimeBetween('now', '+7 days');
        $deliveryDate = (clone $pickupDate)->modify('+' . $service->turnaround_hours . ' hours');

        return [
            'order_number' => LaundryOrder::generateOrderNumber(),
            'user_id' => User::customers()->inRandomOrder()->first()->id ?? User::factory()->create(['role' => 'customer'])->id,
            'laundry_service_id' => $service->id,
            'quantity' => $quantity,
            'special_instructions' => $this->faker->optional(0.3)->sentence(),
            'pickup_date' => $pickupDate,
            'delivery_date' => $deliveryDate,
            'pickup_address' => $this->faker->address(),
            'delivery_address' => $this->faker->address(),
            'total_amount' => $totalAmount,
            'status' => $this->faker->randomElement([
                'pending', 'confirmed', 'picked_up', 'processing', 'washing', 
                'drying', 'ready_for_delivery', 'completed'
            ]),
            'assigned_staff_id' => $this->faker->optional(0.7)->randomElement(
                User::staff()->pluck('id')->toArray()
            ),
            'staff_notes' => $this->faker->optional(0.2)->sentence(),
        ];
    }

    /**
     * Indicate that the order is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'assigned_staff_id' => null,
        ]);
    }

    /**
     * Indicate that the order is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }
}