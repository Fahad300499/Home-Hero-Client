import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='text-center mt-50'>
            <h2 className='text-2xl'>Error </h2>
            <p className='text-8xl font-bold mb-10'>404</p>
            <Link to='/' className='btn btn-primary'>Back To Home</Link>
        </div>
    );
};

export default Error;