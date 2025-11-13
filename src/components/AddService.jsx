import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Navbar from './Navbar';

const AddService = () => {
    const navigate = useNavigate();
    const services = useLoaderData()
    console.log(services)


    const handleAddService=(e)=>{
        e.preventDefault();
        const ServiceName = e.target.ServiceName.value;
        const ImageURL = e.target.ImageURL.value;
        const email = e.target.email.value;
        const price = e.target.price.value;
        console.log(price, email, ImageURL, ServiceName)

        const newService = {
            ServiceName : ServiceName,
            ImageURL : ImageURL,
            Price : price,
            Email: email
        }

        fetch('http://localhost:3000/services', {
            method : 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(newService)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.insertedId){ 
                // টোস্ট নোটিফিকেশন দেখান
                // ✅ সফলভাবে যোগ করার পর All Services পেইজে নিয়ে যান
                alert('Add Service Successfully')
                e.target.reset();
                navigate('/my-services'); 
            }
        })

    }

    return (
        <div className='w-11/12 mx-auto '>
            <div>
                <Navbar></Navbar>
            </div>
            <div className=''>
                <form onSubmit={handleAddService}>
                        <fieldset className="fieldset">

                            {/* **** */}

                            <button className="btn btn-neutral mt-4">Add Service</button>
                        </fieldset>
                    </form>
            </div>
        </div>
    );
};

export default AddService;