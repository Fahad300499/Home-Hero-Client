import React from 'react';

const Customer = () => {
    return (
        <div className='my-20'>
            <h1 className='text-center text-2xl font-bold text-blue-500 my-5'>Customer Testimonials</h1>
            
            <div className='flex justify-between gap-5'>
                <div class="bg-white p-8 rounded-xl shadow-xl transition hover:shadow-2xl">
                <div class="flex items-center text-blue-500 mb-4">
                    ⭐⭐⭐⭐⭐
                </div>
                <p class="text-gray-700 italic text-lg mb-6">
                    "I never thought I could book a service so quickly and easily. The whole process was incredibly smooth and the support team was extremely helpful."
                </p>
                <div class="flex items-center">

                    <div>
                        <p class="font-bold text-blue-700">Abdullah Al Fahad</p>
                    </div>
                </div>
                <p class="text-xs mt-3 text-blue-400">Book Service: Package 1</p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-xl transition hover:shadow-2xl">
                <div class="flex items-center text-blue-500 mb-4">
                    ⭐⭐⭐⭐
                </div>
                <p class="text-gray-700 italic text-lg mb-6">
                    "I never thought I could book a service so quickly and easily. The whole process was incredibly smooth and the support team was extremely helpful."
                </p>
                <div class="flex items-center">

                    <div>
                        <p class="font-bold text-blue-700">Abdullah Bin Hamim</p>
                    </div>
                </div>
                <p class="text-xs mt-3 text-blue-400">Book Service: Package 1</p>
            </div>


           <div class="bg-white p-8 rounded-xl shadow-xl transition hover:shadow-2xl">
                <div class="flex items-center text-blue-500 mb-4">
                    ⭐⭐⭐⭐
                </div>
                <p class="text-gray-700 italic text-lg mb-6">
                    "I never thought I could book a service so quickly and easily. The whole process was incredibly smooth and the support team was extremely helpful."
                </p>
                <div class="flex items-center">

                    <div>
                        <p class="font-bold text-blue-700">Rasel Farhad</p>
                    </div>
                </div>
                <p class="text-xs mt-3 text-blue-400">Book Service: Package 1</p>
            </div>
            </div>


        </div>
    );
};

export default Customer;