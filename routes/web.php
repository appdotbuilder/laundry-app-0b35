<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LaundryOrderController;
use App\Http\Controllers\LaundryServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Laundry services routes
    Route::get('services', [LaundryServiceController::class, 'index'])->name('services.index');
    
    // Laundry orders routes
    Route::resource('orders', LaundryOrderController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
