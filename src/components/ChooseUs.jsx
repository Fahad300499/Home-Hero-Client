import React from 'react';
import 'animate.css';

const ChooseUs = () => {
    return (
        <div className='my-10'>
            <h2 className='text-center my-3 text-xl font-bold text-blue-500'>Why choose US</h2>
            <div className='grid grid-cols-3 gap-3  '>
                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03]'>
                    <h2 className='text-center font-bold'>High Quality</h2>
                    <p className='text-center'>Iriure reprimique pro ea, errem luptatum quo an, utinam nullam alienum te est.</p>
                </div>

                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2 className='text-center font-bold'>Low Cost</h2>
                    <p className='text-center'>Ei integre consetetur vim, eu est veri omittantur. Sit no sint hinc munere.</p>
                </div>

                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2 className='text-center font-bold'>Eco-Friendly Cleaning</h2>
                    <p className='text-center'>Bonorum prodesset mei, id his perfecto hendrerit, vix ea prompta euismod laoreet.</p>
                </div>

              <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2 className='text-center font-bold'>Professional Cleaning</h2>
                    <p className='text-center'>Iriure reprimique pro ea, errem luptatum quo an, utinam nullam alienum te est.</p>
                </div>

                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2 className='text-center font-bold'>Excellent Result</h2>
                    <p className='text-center'>Iriure reprimique pro ea, errem luptatum quo an, utinam nullam alienum te est.</p>
                </div>

                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2 className='text-center font-bold'>Quick cleaning</h2>
                    <p className='text-center'>Iriure reprimique pro ea, errem luptatum quo an, utinam nullam alienum te est.</p>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;