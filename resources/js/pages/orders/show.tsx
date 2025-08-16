import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Order {
    id: number;
    order_number: string;
    customer: {
        name: string;
        email: string;
        phone?: string;
    };
    service: {
        name: string;
        description: string;
    };
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

interface StaffMember {
    id: number;
    name: string;
}



interface Props {
    order: Order;
    staffMembers: StaffMember[];
    userRole: string;
    [key: string]: unknown;
}

export default function ShowOrder({ order, staffMembers, userRole }: Props) {
    const isCustomer = userRole === 'customer';
    const [isEditingStatus, setIsEditingStatus] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        status: order.status,
        staff_notes: order.staff_notes || '',
        assigned_staff_id: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Orders',
            href: '/orders',
        },
        {
            title: order.order_number,
            href: `/orders/${order.id}`,
        },
    ];

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

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'picked_up', label: 'Picked Up' },
        { value: 'processing', label: 'Processing' },
        { value: 'washing', label: 'Washing' },
        { value: 'drying', label: 'Drying' },
        { value: 'ironing', label: 'Ironing' },
        { value: 'ready_for_delivery', label: 'Ready for Delivery' },
        { value: 'out_for_delivery', label: 'Out for Delivery' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
    ];

    const handleStatusUpdate: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('orders.update', order.id), {
            onSuccess: () => {
                setIsEditingStatus(false);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order ${order.order_number}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            📦 Order {order.order_number}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Placed on {order.created_at}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status_color)}`}>
                            {order.status_label}
                        </span>
                        {!isCustomer && (
                            <button
                                onClick={() => setIsEditingStatus(!isEditingStatus)}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                            >
                                {isEditingStatus ? 'Cancel' : '✏️ Update Status'}
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Order Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Information (Staff View) */}
                        {!isCustomer && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    👤 Customer Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
                                        <p className="text-gray-900 dark:text-white">{order.customer.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                                        <p className="text-gray-900 dark:text-white">{order.customer.email}</p>
                                    </div>
                                    {order.customer.phone && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                                            <p className="text-gray-900 dark:text-white">{order.customer.phone}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Service Details */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                🧺 Service Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Service</label>
                                    <p className="text-gray-900 dark:text-white font-medium">{order.service.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{order.service.description}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Quantity</label>
                                        <p className="text-gray-900 dark:text-white">{order.quantity} {order.pricing_unit}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Amount</label>
                                        <p className="text-gray-900 dark:text-white font-semibold text-lg">${order.total_amount.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Schedule & Addresses */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📅 Schedule & Addresses
                            </h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Pickup Date</label>
                                        <p className="text-gray-900 dark:text-white">{order.pickup_date}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivery Date</label>
                                        <p className="text-gray-900 dark:text-white">{order.delivery_date}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Pickup Address</label>
                                        <p className="text-gray-900 dark:text-white">{order.pickup_address}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivery Address</label>
                                        <p className="text-gray-900 dark:text-white">{order.delivery_address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Special Instructions */}
                        {order.special_instructions && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    📝 Special Instructions
                                </h3>
                                <p className="text-gray-900 dark:text-white">{order.special_instructions}</p>
                            </div>
                        )}

                        {/* Staff Notes */}
                        {!isCustomer && order.staff_notes && (
                            <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-700 p-6">
                                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
                                    🗒️ Staff Notes
                                </h3>
                                <p className="text-yellow-700 dark:text-yellow-300">{order.staff_notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Status Update Form (Staff Only) */}
                        {!isCustomer && isEditingStatus && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    ✏️ Update Status
                                </h3>
                                <form onSubmit={handleStatusUpdate} className="space-y-4">
                                    <div>
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        >
                                            {statusOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.status && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.status}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="assigned_staff_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Assign Staff
                                        </label>
                                        <select
                                            id="assigned_staff_id"
                                            value={data.assigned_staff_id}
                                            onChange={(e) => setData('assigned_staff_id', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="">No staff assigned</option>
                                            {staffMembers.map((staff) => (
                                                <option key={staff.id} value={staff.id}>
                                                    {staff.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.assigned_staff_id && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.assigned_staff_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="staff_notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Staff Notes
                                        </label>
                                        <textarea
                                            id="staff_notes"
                                            rows={3}
                                            value={data.staff_notes}
                                            onChange={(e) => setData('staff_notes', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="Add internal notes about this order..."
                                        />
                                        {errors.staff_notes && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.staff_notes}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                                    >
                                        {processing ? 'Updating...' : 'Update Status'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Order Summary */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📋 Order Summary
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Order Number:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{order.order_number}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status_color)}`}>
                                        {order.status_label}
                                    </span>
                                </div>
                                {order.assigned_staff && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Assigned Staff:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{order.assigned_staff}</span>
                                    </div>
                                )}
                                <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-3">
                                    <span className="font-semibold text-gray-900 dark:text-white">Total Amount:</span>
                                    <span className="font-semibold text-blue-600 text-lg">${order.total_amount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Timeline */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                ⏱️ Order Timeline
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                    <span className="text-gray-600 dark:text-gray-400">Order placed: {order.created_at}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                    <span className="text-gray-600 dark:text-gray-400">Pickup scheduled: {order.pickup_date}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                    <span className="text-gray-600 dark:text-gray-400">Delivery scheduled: {order.delivery_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}