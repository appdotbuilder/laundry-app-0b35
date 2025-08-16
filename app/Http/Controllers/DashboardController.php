<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\LaundryOrder;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->role === 'customer') {
            // Get customer's order statistics
            $totalOrders = LaundryOrder::where('user_id', $user->id)->count();
            $activeOrders = LaundryOrder::where('user_id', $user->id)->active()->count();
            $completedOrders = LaundryOrder::where('user_id', $user->id)->where('status', 'completed')->count();
            $totalSpent = LaundryOrder::where('user_id', $user->id)->sum('total_amount');

            // Get recent orders
            $recentOrders = LaundryOrder::with(['laundryService'])
                ->where('user_id', $user->id)
                ->latest()
                ->limit(5)
                ->get()
                ->map(function ($order) {
                    $statusInfo = $order->getStatusLabel();
                    return [
                        'id' => $order->id,
                        'order_number' => $order->order_number,
                        'service_name' => $order->laundryService->name,
                        'total_amount' => $order->total_amount,
                        'status' => $order->status,
                        'status_label' => $statusInfo['label'],
                        'status_color' => $statusInfo['color'],
                        'created_at' => $order->created_at->format('M d, Y'),
                    ];
                });

            return Inertia::render('dashboard', [
                'userRole' => 'customer',
                'stats' => [
                    'totalOrders' => $totalOrders,
                    'activeOrders' => $activeOrders,
                    'completedOrders' => $completedOrders,
                    'totalSpent' => $totalSpent,
                ],
                'recentOrders' => $recentOrders,
                'topCustomers' => [],
            ]);
        } else {
            // Get order statistics
            $totalOrders = LaundryOrder::count();
            $pendingOrders = LaundryOrder::where('status', 'pending')->count();
            $activeOrders = LaundryOrder::active()->count();
            $completedToday = LaundryOrder::where('status', 'completed')
                ->whereDate('updated_at', today())
                ->count();

            // Get recent orders
            $recentOrders = LaundryOrder::with(['user', 'laundryService', 'assignedStaff'])
                ->latest()
                ->limit(10)
                ->get()
                ->map(function ($order) {
                    $statusInfo = $order->getStatusLabel();
                    return [
                        'id' => $order->id,
                        'order_number' => $order->order_number,
                        'customer_name' => $order->user->name,
                        'service_name' => $order->laundryService->name,
                        'total_amount' => $order->total_amount,
                        'status' => $order->status,
                        'status_label' => $statusInfo['label'],
                        'status_color' => $statusInfo['color'],
                        'assigned_staff' => $order->assignedStaff?->name,
                        'created_at' => $order->created_at->format('M d, Y h:i A'),
                    ];
                });

            // Get top customers
            $topCustomers = User::customers()
                ->withCount('orders')
                ->with(['orders' => function ($query) {
                    $query->select('user_id', DB::raw('SUM(total_amount) as total_spent'));
                }])
                ->having('orders_count', '>', 0)
                ->orderBy('orders_count', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($customer) {
                    $totalSpent = $customer->orders->sum('total_amount');
                    return [
                        'name' => $customer->name,
                        'email' => $customer->email,
                        'orders_count' => $customer->orders_count,
                        'total_spent' => $totalSpent,
                    ];
                });

            return Inertia::render('dashboard', [
                'userRole' => $user->role,
                'stats' => [
                    'totalOrders' => $totalOrders,
                    'pendingOrders' => $pendingOrders,
                    'activeOrders' => $activeOrders,
                    'completedToday' => $completedToday,
                ],
                'recentOrders' => $recentOrders,
                'topCustomers' => $topCustomers,
            ]);
        }
    }
}