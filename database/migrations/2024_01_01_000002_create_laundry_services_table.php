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
        Schema::create('laundry_services', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Service name like Wash & Fold');
            $table->text('description')->comment('Detailed service description');
            $table->decimal('price_per_kg', 8, 2)->nullable()->comment('Price per kilogram if applicable');
            $table->decimal('price_per_piece', 8, 2)->nullable()->comment('Price per piece if applicable');
            $table->enum('pricing_type', ['per_kg', 'per_piece'])->comment('How this service is priced');
            $table->integer('turnaround_hours')->default(24)->comment('Expected turnaround time in hours');
            $table->boolean('is_active')->default(true)->comment('Whether this service is currently available');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('is_active');
            $table->index('pricing_type');
            $table->index(['is_active', 'pricing_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laundry_services');
    }
};