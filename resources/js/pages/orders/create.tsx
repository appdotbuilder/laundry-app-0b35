import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    pricing_unit: string;
    pricing_type: string;
    turnaround_hours: number;
}

interface User {
    address?: string;
}



interface Props {
    services: Service[];
    user: User;
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
    {
        title: 'Create Order',
        href: '/orders/create',
    },
];

export default function CreateOrder({ services, user }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        laundry_service_id: '',
        quantity: '',
        special_instructions: '',
        pickup_date: '',
        delivery_date: '',
        pickup_address: user.address || '',
        delivery_address: user.address || '',
    });

    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [estimatedTotal, setEstimatedTotal] = useState<number>(0);

    const handleServiceChange = (serviceId: string) => {
        const service = services.find(s => s.id === parseInt(serviceId));
        setSelectedService(service || null);
        setData('laundry_service_id', serviceId);
        
        if (service && data.quantity) {
            const quantity = parseFloat(data.quantity);
            setEstimatedTotal(quantity * service.price);
        }
    };

    const handleQuantityChange = (quantity: string) => {
        setData('quantity', quantity);
        
        if (selectedService && quantity) {
            const qty = parseFloat(quantity);
            setEstimatedTotal(qty * selectedService.price);
        } else {
            setEstimatedTotal(0);
        }
    };

    const handlePickupDateChange = (date: string) => {
        setData('pickup_date', date);
        
        if (selectedService && date) {
            const pickupDate = new Date(date);
            const deliveryDate = new Date(pickupDate.getTime() + selectedService.turnaround_hours * 60 * 60 * 1000);
            const deliveryDateString = deliveryDate.toISOString().slice(0, 16);
            setData('delivery_date', deliveryDateString);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    const getServiceIcon = (name: string) => {
        if (name.toLowerCase().includes('wash')) return '👕';
        if (name.toLowerCase().includes('dry clean')) return '🤵';
        if (name.toLowerCase().includes('iron')) return '👔';
        if (name.toLowerCase().includes('express')) return '⚡';
        return '🧺';
    };

    const formatTurnaroundTime = (hours: number) => {
        if (hours < 24) {
            return `${hours} hours`;
        } else {
            const days = Math.floor(hours / 24);
            return days === 1 ? '1 day' : `${days} days`;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Order" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        📋 Create New Order
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Fill out the details below to place your laundry order
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Service Selection */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    1. Select Service
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {services.map((service) => (
                                        <label key={service.id} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="service"
                                                value={service.id}
                                                checked={data.laundry_service_id === service.id.toString()}
                                                onChange={(e) => handleServiceChange(e.target.value)}
                                                className="sr-only"
                                            />
                                            <div className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
                                                data.laundry_service_id === service.id.toString()
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                            }`}>
                                                <div className="flex items-start">
                                                    <span className="text-2xl mr-3">{getServiceIcon(service.name)}</span>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                                            {service.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                            ${service.price.toFixed(2)}/{service.pricing_unit} • {formatTurnaroundTime(service.turnaround_hours)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.laundry_service_id && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.laundry_service_id}</p>
                                )}
                            </div>

                            {/* Quantity */}
                            {selectedService && (
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        2. Quantity
                                    </h3>
                                    <div>
                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Quantity ({selectedService.pricing_unit})
                                        </label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            step="0.1"
                                            min="0.1"
                                            max="100"
                                            value={data.quantity}
                                            onChange={(e) => handleQuantityChange(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={`Enter quantity in ${selectedService.pricing_unit}`}
                                        />
                                        {errors.quantity && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.quantity}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Schedule */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    3. Schedule Pickup & Delivery
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="pickup_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Pickup Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="pickup_date"
                                            value={data.pickup_date}
                                            onChange={(e) => handlePickupDateChange(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.pickup_date && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.pickup_date}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="delivery_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Delivery Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="delivery_date"
                                            value={data.delivery_date}
                                            onChange={(e) => setData('delivery_date', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                        {errors.delivery_date && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.delivery_date}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Addresses */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    4. Pickup & Delivery Addresses
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="pickup_address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Pickup Address
                                        </label>
                                        <textarea
                                            id="pickup_address"
                                            rows={3}
                                            value={data.pickup_address}
                                            onChange={(e) => setData('pickup_address', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="Enter full pickup address"
                                        />
                                        {errors.pickup_address && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.pickup_address}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="delivery_address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Delivery Address
                                        </label>
                                        <textarea
                                            id="delivery_address"
                                            rows={3}
                                            value={data.delivery_address}
                                            onChange={(e) => setData('delivery_address', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="Enter full delivery address"
                                        />
                                        {errors.delivery_address && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.delivery_address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Special Instructions */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    5. Special Instructions (Optional)
                                </h3>
                                <textarea
                                    id="special_instructions"
                                    rows={4}
                                    value={data.special_instructions}
                                    onChange={(e) => setData('special_instructions', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Any special care instructions, stain removal requests, or other notes..."
                                />
                                {errors.special_instructions && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.special_instructions}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                                >
                                    {processing ? 'Placing Order...' : '📋 Place Order'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Order Summary
                            </h3>
                            {selectedService ? (
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">{getServiceIcon(selectedService.name)}</span>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {selectedService.name}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                ${selectedService.price.toFixed(2)}/{selectedService.pricing_unit}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {data.quantity && (
                                        <div className="flex justify-between py-2 border-t border-gray-200 dark:border-gray-600">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Quantity: {data.quantity} {selectedService.pricing_unit}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {estimatedTotal > 0 && (
                                        <div className="flex justify-between py-2 border-t border-gray-200 dark:border-gray-600">
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                Estimated Total:
                                            </span>
                                            <span className="font-semibold text-blue-600 text-lg">
                                                ${estimatedTotal.toFixed(2)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <span className="mr-2">🚚</span>
                                            Free pickup & delivery
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            <span className="mr-2">⏱️</span>
                                            {formatTurnaroundTime(selectedService.turnaround_hours)} turnaround
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <span className="text-4xl mb-2 block">🧺</span>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Select a service to see the order summary
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}