<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\LaundryService;
use App\Models\LaundryOrder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Laundry Admin',
            'email' => 'admin@laundry.com',
            'role' => 'admin',
            'phone' => '+1234567890',
            'address' => '123 Main Street, Admin Office',
        ]);

        // Create staff users
        $staff1 = User::factory()->create([
            'name' => 'Sarah Johnson',
            'email' => 'sarah@laundry.com',
            'role' => 'staff',
            'phone' => '+1234567891',
            'address' => '456 Oak Avenue',
        ]);

        $staff2 = User::factory()->create([
            'name' => 'Mike Wilson',
            'email' => 'mike@laundry.com',
            'role' => 'staff',
            'phone' => '+1234567892',
            'address' => '789 Pine Street',
        ]);

        // Create customer users
        $customer1 = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'role' => 'customer',
            'phone' => '+1234567893',
            'address' => '321 Elm Street, Apt 5B',
        ]);

        $customer2 = User::factory()->create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'role' => 'customer',
            'phone' => '+1234567894',
            'address' => '654 Maple Drive',
        ]);

        // Create additional customers
        User::factory(8)->create(['role' => 'customer']);

        // Create laundry services
        LaundryService::factory(5)->create();

        // Create orders with various statuses
        LaundryOrder::factory(20)->create();
        LaundryOrder::factory(5)->pending()->create();
        LaundryOrder::factory(3)->completed()->create();
    }
}
