import React from 'react';
import Hero from './Hero';
import { Link, useLoaderData } from 'react-router';
import ChooseUs from './ChooseUs';
import Customer from './Customer';

const Home = () => {
    const services = useLoaderData();
    console.log(services);
    return (
        <div className='w-11/12 mx-auto'>
            <div className='grid grid-cols-3 gap-4 my-6 '>
            {
                services.map(service=>
                <div className='border p-2 rounded-2xl border-gray-200 shadow-2xl' key={service._id}>
                    <h3 className='text-center font-bold mb-2'>{service.ServiceName}</h3>
                   <img className="h-[250px] w-full" src={service.ImageURL} alt="" srcset="" />
                   <h2 className='font-bold'>{service.Category}</h2>
                   <p className='text-sm'>{service.Description}</p>
                   <div className='text-[12px] flex justify-between my-2 font-bold'>
                    <p>Price: {service.Price}</p>
                    <p>Provider: {service.ProviderName}</p>
                   </div>
                   {/* <Link to={`/servicesDetails/${service._id}`} className='btn '>Service Details</Link> */}
                   <Link to={`/servicesDetails/${service._id}`} className='btn '>Service Details</Link>
                </div>)
            }  
        </div>

<Link to='/services' className='btn mb-4 text-white bg-gray-500 flex justify-center'>Show All Services</Link>
        <div>
            <ChooseUs></ChooseUs>
        </div>
        <div>
            <Customer></Customer>
        </div>
        </div>

    );
};

export default Home;