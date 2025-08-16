import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    pricing_unit: string;
    pricing_type: string;
    turnaround_hours: number;
}

interface Props {
    services: Service[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Services',
        href: '/services',
    },
];

export default function ServicesIndex({ services }: Props) {
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
            <Head title="Our Services" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            🧺 Our Laundry Services
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Choose from our premium laundry services with competitive pricing
                        </p>
                    </div>
                    <Link
                        href={route('orders.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        📋 Place Order
                    </Link>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl mr-3">{getServiceIcon(service.name)}</span>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {service.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {formatTurnaroundTime(service.turnaround_hours)} turnaround
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                                    {service.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-baseline">
                                        <span className="text-2xl font-bold text-blue-600">
                                            ${service.price.toFixed(2)}
                                        </span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                                            /{service.pricing_unit}
                                        </span>
                                    </div>
                                    <Link
                                        href={route('orders.create', { service: service.id })}
                                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                    >
                                        Select
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {services.length === 0 && (
                    <div className="text-center py-12">
                        <span className="text-6xl mb-4 block">🧺</span>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No Services Available
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Services are currently being updated. Please check back later.
                        </p>
                    </div>
                )}

                {/* Additional Information */}
                <div className="mt-8 bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        💡 Service Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Pickup & Delivery</h4>
                            <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                                <li>• Free pickup and delivery within city limits</li>
                                <li>• Flexible scheduling to fit your routine</li>
                                <li>• Real-time notifications and updates</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Quality Guarantee</h4>
                            <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                                <li>• Professional-grade equipment and products</li>
                                <li>• Eco-friendly cleaning solutions</li>
                                <li>• 100% satisfaction guarantee</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}