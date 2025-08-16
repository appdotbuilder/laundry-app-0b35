import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Order {
    id: number;
    order_number: string;
    service_name?: string;
    customer_name?: string;
    total_amount: number;
    status: string;
    status_label: string;
    status_color: string;
    assigned_staff?: string;
    created_at: string;
}

interface Customer {
    name: string;
    email: string;
    orders_count: number;
    total_spent: number;
}

interface Props {
    userRole: string;
    stats: {
        totalOrders?: number;
        activeOrders?: number;
        completedOrders?: number;
        totalSpent?: number;
        pendingOrders?: number;
        completedToday?: number;
    };
    recentOrders: Order[];
    topCustomers?: Customer[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ userRole, stats, recentOrders, topCustomers }: Props) {
    const isCustomer = userRole === 'customer';

    const getStatusColor = (color: string) => {
        const colorMap: Record<string, string> = {
            yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
            purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
            orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
            pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
            cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
            teal: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
            green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
            gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
        };
        return colorMap[color] || colorMap.gray;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isCustomer ? '🧺 Your Laundry Dashboard' : '📊 Staff Dashboard'}
                    </h1>
                    {isCustomer && (
                        <Link
                            href={route('orders.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            📋 New Order
                        </Link>
                    )}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {isCustomer ? (
                        <>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">📦</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">🔄</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Orders</p>
                                        <p className="text-2xl font-bold text-orange-600">{stats.activeOrders}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">💰</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</p>
                                        <p className="text-2xl font-bold text-blue-600">${stats.totalSpent?.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">📦</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">⏳</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
                                        <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">🔄</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Orders</p>
                                        <p className="text-2xl font-bold text-blue-600">{stats.activeOrders}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Today</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.completedToday}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
                                <Link 
                                    href={route('orders.index')}
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                                >
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {order.order_number}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {isCustomer ? order.service_name : `${order.customer_name} - ${order.service_name}`}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500">{order.created_at}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status_color)}`}>
                                                    {order.status_label}
                                                </span>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    ${order.total_amount.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <span className="text-4xl mb-2 block">📋</span>
                                        <p className="text-gray-600 dark:text-gray-400">No orders yet</p>
                                        {isCustomer && (
                                            <Link
                                                href={route('orders.create')}
                                                className="mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                                            >
                                                Place your first order
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Top Customers (Staff Only) or Quick Actions (Customer) */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-6">
                            {isCustomer ? (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <Link
                                            href={route('orders.create')}
                                            className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-lg transition-colors duration-200"
                                        >
                                            <span className="text-2xl mr-3">📋</span>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">Place New Order</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Book pickup & delivery</p>
                                            </div>
                                        </Link>
                                        <Link
                                            href={route('orders.index')}
                                            className="flex items-center p-4 bg-green-50 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800 rounded-lg transition-colors duration-200"
                                        >
                                            <span className="text-2xl mr-3">📦</span>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">View All Orders</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Track order status</p>
                                            </div>
                                        </Link>
                                        <Link
                                            href={route('services.index')}
                                            className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900 dark:hover:bg-purple-800 rounded-lg transition-colors duration-200"
                                        >
                                            <span className="text-2xl mr-3">🧺</span>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">Browse Services</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">See pricing & options</p>
                                            </div>
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Customers</h3>
                                    <div className="space-y-4">
                                        {topCustomers && topCustomers.length > 0 ? (
                                            topCustomers.map((customer, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {customer.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                            {customer.email}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {customer.orders_count} orders
                                                        </p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                            ${customer.total_spent.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                                                No customer data available
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}