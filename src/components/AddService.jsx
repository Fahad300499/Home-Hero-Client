import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import Swal from 'sweetalert2';

const AddService = () => {
    const navigate = useNavigate();
    const services = useLoaderData()
    console.log(services)


    const handleAddService = (e) => {
        e.preventDefault();
        const ServiceName = e.target.ServiceName.value;
        const ImageURL = e.target.ImageURL.value;
        const email = e.target.email.value;
        const price = e.target.price.value;
        console.log(price, email, ImageURL, ServiceName)

        const newService = {
            ServiceName: ServiceName,
            ImageURL: ImageURL,
            Price: price,
            Email: email
        }

        fetch('https://home-hero-server.onrender.com/services', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newService)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: "Add service successfully",
                        icon: "success",
                        draggable: true
                    });
                    e.target.reset();
                    navigate('/my-services');
                }
            })

    }

    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='w-10/12 mx-auto '>

                <div className='md:w-11/12 md:mx-auto my-10'>
                    <h1 className='text-center text-2xl font-bold text-blue-500 mb-5'>Add Your Service</h1>
                    <div className='ml-5 md:ml-60 lg:ml-120'>
                        <form onSubmit={handleAddService}>
                            <fieldset className="fieldset">

                                <label className="label">ServiceName</label>
                                <input type="text" name='ServiceName' className="input" placeholder="Name" />

                                <label className="label">ImageURL</label>
                                <input type="photo" name='ImageURL' className="input" placeholder="Photo" />

                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" placeholder="Email" />

                                <label className="label">Price</label>
                                <input type="text" name='price' className="input" placeholder="Password" />


                                <button className="btn btn-neutral mt-4 w-[320px]">Add Service</button>
                            </fieldset>
                        </form>
                    </div>
                </div>

            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>

    );
};

export default AddService;