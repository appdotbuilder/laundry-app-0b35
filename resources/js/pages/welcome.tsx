import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="CleanExpress - Professional Laundry Services">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
                {/* Navigation */}
                <nav className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">CE</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">CleanExpress</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('login')}
                                    className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                            🧺 Professional Laundry
                            <span className="block text-blue-600">Made Simple</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Experience premium laundry services with convenient pickup and delivery. 
                            From everyday wash & fold to delicate dry cleaning - we handle it all with care.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {auth.user ? (
                                <Link
                                    href={route('orders.create')}
                                    className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Place New Order
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        Start Your First Order
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="text-base font-semibold leading-6 text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors duration-200"
                                    >
                                        Existing Customer? Sign In →
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Services Preview */}
                    <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="relative group">
                            <div className="h-32 w-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <span className="text-3xl mb-2">👕</span>
                                <h3 className="font-semibold text-lg">Wash & Fold</h3>
                                <p className="text-sm opacity-90">From $15/kg</p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="h-32 w-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <span className="text-3xl mb-2">🤵</span>
                                <h3 className="font-semibold text-lg">Dry Cleaning</h3>
                                <p className="text-sm opacity-90">From $25/piece</p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="h-32 w-full bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <span className="text-3xl mb-2">👔</span>
                                <h3 className="font-semibold text-lg">Ironing</h3>
                                <p className="text-sm opacity-90">From $8/piece</p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="h-32 w-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <span className="text-3xl mb-2">⚡</span>
                                <h3 className="font-semibold text-lg">Express</h3>
                                <p className="text-sm opacity-90">Same day service</p>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-24">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                            Why Choose CleanExpress?
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🚚</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Free Pickup & Delivery</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Schedule convenient pickup and delivery times that work with your busy lifestyle.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📱</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-Time Tracking</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Track your order status in real-time from pickup to delivery with instant updates.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⭐</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Premium Quality</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Professional-grade cleaning with eco-friendly products and expert care for all fabrics.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Process Steps */}
                    <div className="mt-24">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                            How It Works
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                                    1
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Schedule Pickup</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Book your preferred pickup time and location online in seconds.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                                    2
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">We Clean</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Our experts clean your items with premium care and attention to detail.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                                    3
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Check</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Every item is inspected to ensure it meets our high quality standards.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                                    4
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Your freshly cleaned items are delivered back to your doorstep.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-24 bg-blue-600 rounded-2xl p-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Experience Premium Laundry Service?
                        </h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust CleanExpress with their laundry needs. 
                            Fast, reliable, and professional service guaranteed.
                        </p>
                        {auth.user ? (
                            <Link
                                href={route('orders.create')}
                                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-lg"
                            >
                                Place Your Order Now
                            </Link>
                        ) : (
                            <Link
                                href={route('register')}
                                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-lg"
                            >
                                Get Started Today - It's Free!
                            </Link>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-24 border-t border-gray-200 dark:border-gray-700 py-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">CE</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">CleanExpress</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-center md:text-right">
                                © 2024 CleanExpress. Premium laundry services with care. <br />
                                Built with ❤️ by{" "}
                                <a 
                                    href="https://app.build" 
                                    target="_blank" 
                                    className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    app.build
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}