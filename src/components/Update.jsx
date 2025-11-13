import React, { use } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthProvider';

const Update = () => {
    const user = use(AuthContext)
    const navigate = useNavigate();
    const services = useLoaderData();
    const { _id, ServiceName, Price } = services
    console.log(services, _id)

    const handleUpdate = (e) => {
        e.preventDefault();
        const newServiceName = e.target.service.value;
        const newPrice = e.target.price.value;
        // console.log(service, price)

        const updateService = {
            ServiceName: newServiceName,
            Price: newPrice,
            ProviderEmailForAuth: user?.email
        }

        fetch(`https://home-hero-server.onrender.com/services/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(updateService),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            navigate('/my-services')
    }


    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='w-10/12 mx-100 my-10'>
                <h1 className=''>Update your Service</h1>
                <form onSubmit={handleUpdate}>
                    <fieldset className="fieldset">

                        <label className="label">Service Name</label>
                        <input type="text" name='service' className="input" defaultValue={ServiceName} />

                        <label className="label">Price</label>
                        <input type="text" name='price' className="input" defaultValue={Price} />

                        <button className="btn w-[320px] btn-neutral mt-4">Update Service</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Update;