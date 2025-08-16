<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\LaundryService;
use Inertia\Inertia;

class LaundryServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = LaundryService::active()
            ->select('id', 'name', 'description', 'price_per_kg', 'price_per_piece', 'pricing_type', 'turnaround_hours')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'description' => $service->description,
                    'price' => $service->getPrice(),
                    'pricing_unit' => $service->getPricingUnit(),
                    'pricing_type' => $service->pricing_type,
                    'turnaround_hours' => $service->turnaround_hours,
                ];
            });

        return Inertia::render('services/index', [
            'services' => $services
        ]);
    }
}