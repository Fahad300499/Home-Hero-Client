import React from 'react';

const Customer = () => {
    return (
        <div className='w-10/12 mx-auto'>
            <div className='my-20'>
            <h1 className='text-center text-2xl font-bold text-blue-500 my-5'>Customer Testimonials</h1>
            
            <div className=' md:flex  justify-between gap-5'>
                <div class="bg-white mb-4 p-8 rounded-xl shadow-xl transition hover:shadow-2xl">
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

            <div class="bg-white mb-4 p-8 rounded-xl shadow-xl transition hover:shadow-2xl">
                <div class="flex items-center text-blue-500 mb-4">
                    ⭐⭐⭐⭐
                </div>
                <p class="text-gray-700 italic text-lg mb-6">
                    "I am very satisfied with Holhold Service! To be honest, at first I thought that the quality of the service might not be good at such a low cost. But my idea was proven wrong."
                </p>
                <div class="flex items-center">

                    <div>
                        <p class="font-bold text-blue-700">Abdullah Bin Hamim</p>
                    </div>
                </div>
                <p class="text-xs mt-3 text-blue-400">Book Service: Package 1</p>
            </div>


           <div class="bg-white p-5 rounded-xl shadow-xl transition hover:shadow-2xl">
                <div class="flex items-center text-blue-500 mb-4">
                    ⭐⭐⭐⭐
                </div>
                <p class="text-gray-700 italic text-lg mb-6">
                    "The experience of calling Holhold Service was amazing. I needed a quick and reliable cleaning service before a big and the professionalism of the Holhold team was truly commendable."
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
        </div>
    );
};

export default Customer;