import React, { use, useEffect } from 'react';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthProvider';
import { useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyServices = () => {
    const { user } = use(AuthContext)
    const [services, setServices] = useState([]);

    useEffect(() => {
        if (user?.email) {

            fetch(`http://localhost:3000/all-services?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setServices(data)
                })
        }
    }, [user?.email])

    const handleDeleteService = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:3000/services/${_id}`, {
                    method: 'DELETE'
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log('after deleted', data)
                    if(data.deleteCount){
                             Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                    }
                   
                })
                const remainingService = services.filter(service=> service._id !== _id)
                setServices(remainingService)

                
                
            }
        });
    }

    return (
        <div>
            <Navbar />
            <div className='w-11/12 mx-auto'>
                <h1 className='text-center my-5 text-2xl font-bold'>My Service: {services.length}</h1>

                {/* ✅ ১. টেবিলের কাঠামো লুপের বাইরে একবার তৈরি হলো */}
                <div className="overflow-x-auto border rounded-lg shadow-lg">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Service Name</th> {/* Service Name ও Image একসাথে */}
                                <th>Email</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* ✅ ২. শুধুমাত্র রো (<tr>) গুলি লুপের ভেতরে থাকবে */}
                            {services.map((service, index) => (
                                <tr key={service._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            {/* <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={service.ImageURL} // ✅ সার্ভিস ইমেজ ব্যবহার করা হলো
                                                        alt={service.ServiceName} />
                                                </div>
                                            </div> */}
                                            <div className="font-bold">{service.ServiceName}</div>
                                        </div>
                                    </td>
                                    <td>
                                        {service.Email} {/* Category ডেটা যোগ করা উচিত */}
                                    </td>
                                    <td>
                                        ৳{service.Price}
                                    </td>
                                    <td className='space-x-2'>
                                        <Link to={`/update/${service._id}`} className="btn btn-sm btn-success">
                                            Update
                                        </Link>
                                        <button onClick={() => handleDeleteService(service._id)} className="btn btn-sm btn-error">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyServices;