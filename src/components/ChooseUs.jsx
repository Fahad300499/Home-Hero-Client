import React from 'react';
import 'animate.css';

const ChooseUs = () => {
    return (
        <div className='my-10'>
            <h2 className='text-center my-3 text-2xl font-bold text-blue-500'>Why choose US</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  '>
                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03]'>
                    <h2 className='text-center font-bold'>High Quality</h2>
                    <p className='text-center'>
                        Holhold Services really kept their promise. First of all, their team was very professional and punctual. They finished the job so quickly that I was amazed! The best part is, their cleaning quality was incredibly high</p>
                </div>

                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2 className='text-center font-bold'>Low Cost</h2>
                    <p className='text-center'>
                        I am very satisfied with Holhold Service! To be honest, at first I thought that the quality of the service might not be good at such a low cost. But my idea was proven wrong.</p>
                </div>

                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2 className='text-center font-bold'>Eco-Friendly Cleaning</h2>
                    <p className='text-center'>I've always been conscious of the environment and my family's health, so when Holhold Service announced that they use 100% Eco-Friendly Cleaning products, I was encouraged.</p>
                </div>

                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2 className='text-center font-bold'>Professional Cleaning</h2>
                    <p className='text-center'>The experience of calling Holhold Service was amazing. I needed a quick and reliable cleaning service before a big event at my home, and the professionalism of the Holhold team was truly commendable.</p>
                </div>

                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2 className='text-center font-bold'>Excellent Result</h2>
                    <p className='text-center'>I recently hired Holhold Service for a deep clean of my home, and I have to say, the Excellent Result speaks for itself. My house wasn't just clean; it was transformed.</p>
                </div>

                <div className='border border-gray-200 p-10 animate__animated animate__slideInLeft card transition-all duration-300 hover:scale-[1.03] '>
                    <h2 className='text-center font-bold'>Quick cleaning</h2>
                    <p className='text-center'>I needed a last-minute clean before an unexpected guest arrived, and Holhold Service was a lifesaver! I chose their Quick Cleaning option, and I was genuinely impressed by how fast and incredibly efficient the team was.</p>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;