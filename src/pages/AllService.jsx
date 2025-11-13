import React from 'react';
import { Link } from 'react-router';

const AllService = ({service}) => {
    
    return (
        <div className='border p-2 rounded-2xl border-gray-200 shadow-2xl' key={service._id}>
                    <h3 className='text-center font-bold mb-2'>{service.ServiceName}</h3>
                   <img className="h-[250px] w-full" src={service.ImageURL} alt="" srcset="" />
                   <h2 className='font-bold'>{service.Category}</h2>
                   <p className='text-sm'>{service.Description}</p>
                   <Link to={`/servicesDetails/${service._id}`} className='btn bg-blue-500 text-white w-full my-2'>Service Details</Link>

                </div>
    );
};

export default AllService;