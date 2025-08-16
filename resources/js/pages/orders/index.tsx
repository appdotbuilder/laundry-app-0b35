import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Order {
    id: number;
    order_number: string;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    service_name: string;
    quantity: number;
    pricing_unit: string;
    total_amount: number;
    status: string;
    status_label: string;
    status_color: string;
    pickup_date: string;
    delivery_date: string;
    pickup_address: string;
    delivery_address: string;
    special_instructions?: string;
    assigned_staff?: string;
    staff_notes?: string;
    created_at: string;
}

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface PaginatedOrders {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    orders: PaginatedOrders;
    userRole: string;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Orders',
        href: '/orders',
    },
];

export default function OrdersIndex({ orders, userRole }: Props) {
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
            <Head title="Orders" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {isCustomer ? '📦 Your Orders' : '📊 All Orders'}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {isCustomer 
                                ? 'Track your laundry orders and their current status'
                                : 'Manage all customer orders and update their status'
                            }
                        </p>
                    </div>
                    {isCustomer && (
                        <Link
                            href={route('orders.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            📋 New Order
                        </Link>
                    )}
                </div>

                {/* Orders List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    {orders.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Order
                                        </th>
                                        {!isCustomer && (
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Customer
                                            </th>
                                        )}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Service
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Pickup Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {orders.data.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {order.order_number}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {order.created_at}
                                                    </div>
                                                </div>
                                            </td>
                                            {!isCustomer && (
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {order.customer_name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {order.customer_email}
                                                        </div>
                                                    </div>
                                                </td>
                                            )}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {order.service_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {order.quantity} {order.pricing_unit}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status_color)}`}>
                                                    {order.status_label}
                                                </span>
                                                {order.assigned_staff && (
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        Staff: {order.assigned_staff}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                ${order.total_amount.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {order.pickup_date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route('orders.show', order.id)}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">📦</span>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No Orders Found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {isCustomer 
                                    ? "You haven't placed any orders yet."
                                    : "No orders have been placed yet."
                                }
                            </p>
                            {isCustomer && (
                                <Link
                                    href={route('orders.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                >
                                    📋 Place Your First Order
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {orders.data.length > 0 && orders.last_page > 1 && (
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {orders.links[0]?.url && (
                                <Link
                                    href={orders.links[0].url}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    Previous
                                </Link>
                            )}
                            {orders.links[orders.links.length - 1]?.url && (
                                <Link
                                    href={orders.links[orders.links.length - 1].url!}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing{' '}
                                    <span className="font-medium">{(orders.current_page - 1) * orders.per_page + 1}</span>
                                    {' '}to{' '}
                                    <span className="font-medium">
                                        {Math.min(orders.current_page * orders.per_page, orders.total)}
                                    </span>
                                    {' '}of{' '}
                                    <span className="font-medium">{orders.total}</span>
                                    {' '}results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    {orders.links.map((link, index) => {
                                        if (!link.url) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                                >
                                                    {link.label}
                                                </span>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={index}
                                                href={link.url as string}
                                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-400'
                                                        : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}