<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laundry_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('laundry_service_id')->constrained();
            $table->decimal('quantity', 8, 2);
            $table->text('special_instructions')->nullable();
            $table->dateTime('pickup_date');
            $table->dateTime('delivery_date');
            $table->string('pickup_address');
            $table->string('delivery_address');
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', [
                'pending',
                'confirmed', 
                'picked_up',
                'processing',
                'washing',
                'drying',
                'ironing',
                'ready_for_delivery',
                'out_for_delivery',
                'completed',
                'cancelled'
            ])->default('pending');
            $table->foreignId('assigned_staff_id')->nullable()->constrained('users');
            $table->text('staff_notes')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('order_number');
            $table->index('user_id');
            $table->index('status');
            $table->index('pickup_date');
            $table->index('delivery_date');
            $table->index('assigned_staff_id');
            $table->index(['user_id', 'status']);
            $table->index(['status', 'pickup_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laundry_orders');
    }
};