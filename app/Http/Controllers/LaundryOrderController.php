<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLaundryOrderRequest;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Models\LaundryOrder;
use App\Models\LaundryService;
use App\Models\User;
use Inertia\Inertia;

class LaundryOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->role === 'customer') {
            // Customer sees only their orders
            $orders = LaundryOrder::with(['laundryService', 'assignedStaff'])
                ->where('user_id', $user->id)
                ->latest()
                ->paginate(10);
        } else {
            // Staff and admin see all orders
            $orders = LaundryOrder::with(['user', 'laundryService', 'assignedStaff'])
                ->latest()
                ->paginate(10);
        }

        $orders->through(function ($order) {
            $statusInfo = $order->getStatusLabel();
            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->user->name,
                'customer_email' => $order->user->email,
                'customer_phone' => $order->user->phone,
                'service_name' => $order->laundryService->name,
                'quantity' => $order->quantity,
                'pricing_unit' => $order->laundryService->getPricingUnit(),
                'total_amount' => $order->total_amount,
                'status' => $order->status,
                'status_label' => $statusInfo['label'],
                'status_color' => $statusInfo['color'],
                'pickup_date' => $order->pickup_date->format('M d, Y h:i A'),
                'delivery_date' => $order->delivery_date->format('M d, Y h:i A'),
                'pickup_address' => $order->pickup_address,
                'delivery_address' => $order->delivery_address,
                'special_instructions' => $order->special_instructions,
                'assigned_staff' => $order->assignedStaff?->name,
                'staff_notes' => $order->staff_notes,
                'created_at' => $order->created_at->format('M d, Y h:i A'),
            ];
        });

        return Inertia::render('orders/index', [
            'orders' => $orders,
            'userRole' => $user->role,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
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

        return Inertia::render('orders/create', [
            'services' => $services,
            'user' => [
                'address' => auth()->user()->address,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLaundryOrderRequest $request)
    {
        $service = LaundryService::findOrFail($request->laundry_service_id);
        $totalAmount = $request->quantity * $service->getPrice();

        $order = LaundryOrder::create([
            'order_number' => LaundryOrder::generateOrderNumber(),
            'user_id' => auth()->id(),
            'laundry_service_id' => $request->laundry_service_id,
            'quantity' => $request->quantity,
            'special_instructions' => $request->special_instructions,
            'pickup_date' => $request->pickup_date,
            'delivery_date' => $request->delivery_date,
            'pickup_address' => $request->pickup_address,
            'delivery_address' => $request->delivery_address,
            'total_amount' => $totalAmount,
            'status' => 'pending',
        ]);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order placed successfully! Order number: ' . $order->order_number);
    }

    /**
     * Display the specified resource.
     */
    public function show(LaundryOrder $order)
    {
        // Check if customer can only view their own orders
        if (auth()->user()->role === 'customer' && $order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to order.');
        }

        $order->load(['user', 'laundryService', 'assignedStaff']);
        $statusInfo = $order->getStatusLabel();

        $orderData = [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'customer' => [
                'name' => $order->user->name,
                'email' => $order->user->email,
                'phone' => $order->user->phone,
            ],
            'service' => [
                'name' => $order->laundryService->name,
                'description' => $order->laundryService->description,
            ],
            'quantity' => $order->quantity,
            'pricing_unit' => $order->laundryService->getPricingUnit(),
            'total_amount' => $order->total_amount,
            'status' => $order->status,
            'status_label' => $statusInfo['label'],
            'status_color' => $statusInfo['color'],
            'pickup_date' => $order->pickup_date->format('M d, Y h:i A'),
            'delivery_date' => $order->delivery_date->format('M d, Y h:i A'),
            'pickup_address' => $order->pickup_address,
            'delivery_address' => $order->delivery_address,
            'special_instructions' => $order->special_instructions,
            'assigned_staff' => $order->assignedStaff?->name,
            'staff_notes' => $order->staff_notes,
            'created_at' => $order->created_at->format('M d, Y h:i A'),
        ];

        // Get staff members for assignment (admin/staff only)
        $staffMembers = [];
        if (in_array(auth()->user()->role, ['admin', 'staff'])) {
            $staffMembers = User::staff()
                ->select('id', 'name')
                ->get()
                ->toArray();
        }

        return Inertia::render('orders/show', [
            'order' => $orderData,
            'staffMembers' => $staffMembers,
            'userRole' => auth()->user()->role,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderStatusRequest $request, LaundryOrder $order)
    {
        $order->update([
            'status' => $request->status,
            'staff_notes' => $request->staff_notes,
            'assigned_staff_id' => $request->assigned_staff_id,
        ]);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order status updated successfully.');
    }
}