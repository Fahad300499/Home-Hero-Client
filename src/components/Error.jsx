import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='text-center mt-50'>
            <h2 className='text-9xl font-bold mb-5 text-blue-500'>Oops!</h2>
            <p className='text-2xl my-3'>404- PAGE NOT FOUND</p>
            <p>The page you are looking for might have been removed <br /> had its name changed or is temporarily unavailable</p>
            <Link to='/' className='btn btn-primary mt-6'>Back To Home</Link>
        </div>
    );
};

export default Error;