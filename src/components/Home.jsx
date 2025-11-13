import React from 'react';
import { Link, useLoaderData } from 'react-router';
import ChooseUs from './ChooseUs';
import Customer from './Customer';

const Home = () => {
    const services = useLoaderData();

    // Calculate average rating for each service and sort descending
    const topRatedServices = services
        .map(service => {
            const reviews = service.reviews || [];
            const avgRating =
                reviews.length > 0
                    ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length
                    : 0;
            return { ...service, avgRating };
        })
        .sort((a, b) => b.avgRating - a.avgRating) // sort descending by avgRating
        .slice(0, 6); // top 6

    return (
        <div className='w-10/12 mx-auto my-20'>
            <h2 className='text-3xl font-bold mb-6 text-center'>Top Rated Services</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-6'>
                {topRatedServices.map(service => (
                    <div
                        className='border p-4 rounded-2xl border-gray-200 shadow-2xl'
                        key={service._id}
                    >
                        <h3 className='text-center font-bold mb-2'>{service.ServiceName}</h3>
                        <img
                            className='h-[250px] w-full object-cover rounded-lg'
                            src={service.ImageURL}
                            alt={service.ServiceName}
                        />
                        <h2 className='font-bold mt-2'>{service.Category}</h2>
                        <p className='text-sm mt-1'>{service.Description}</p>
                      
                        <p className='text-yellow-500 font-semibold mb-2'>
                            {'⭐'.repeat(Math.round(service.avgRating))} ({service.avgRating.toFixed(1)})
                        </p>
                        <Link
                            to={`/servicesDetails/${service._id}`}
                            className='btn text-white bg-blue-500 w-full'
                        >
                            Service Details
                        </Link>
                    </div>
                ))}
            </div>

            <Link
                to='/services'
                className='btn mb-4 text-white bg-blue-500 flex justify-center mx-auto'
            >
                Show All Services
            </Link>

            <ChooseUs />
            <Customer />
        </div>
    );
};

export default Home;