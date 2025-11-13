import React from 'react';
import 'animate.css';

const ChooseUs = () => {
    return (
        <div className='my-10'>
            <h2 className='text-center my-3 text-xl font-bold'>Why choose US</h2>
            <div className='grid grid-cols-3 gap-3  '>
                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03]'>
                    <h2>High Quality</h2>
                    <p>Iriure reprimique pro ea, errem luptatum quo an, utinam nullam alienum te est.</p>
                </div>

                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2>High Quality</h2>
                    <p>Iriure reprimique pro ea, errem luptatum quo an, utinam nullam alienum te est.</p>
                </div>

                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2>High Quality</h2>
                    <p>Iriure reprimique pro ea, errem luptatum quo an, utinam nullam alienum te est.</p>
                </div>

             {/* ****** */}
            </div>
        </div>
    );
};

export default ChooseUs;