import React, { use, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyBookings = () => {
    const { user } = use(AuthContext)
        const [bookings, setBookings] = useState([]);

    //    ****


            const handleDeleteBooking = (_id) => {
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
            
                            fetch(`http://localhost:3000/bookings/${_id}`, {
                                method: 'DELETE',
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
                            const remainingBooking = bookings.filter(booking=> booking._id !== _id)
                            setBookings(remainingBooking)
            
                            
                            
                        }
                    });
                }
        

    return (
         <div>
            <Navbar />
            <div className='w-11/12 mx-auto'>
                <h1 className='text-center my-5 text-2xl font-bold'>My Bookings: {bookings.length}</h1>

                {/* ✅ ১. টেবিলের কাঠামো লুপের বাইরে একবার তৈরি হলো */}
                <div className="overflow-x-auto border rounded-lg shadow-lg">
                    <table className="table table-zebra w-full">
                        <thead>
                            
                                <th>#</th>
                                {/* <th>Provider Name</th> Service Name ও Image একসাথে */}
                                <th>Email</th>
                                <th>Price</th>
                                <th>Action</th>
                            
                        </thead>
                        <tbody>
                            {/* ✅ ২. শুধুমাত্র রো (<tr>) গুলি লুপের ভেতরে থাকবে */}
                            {bookings.map((booking, index) => (
                                <tr key={booking._id}>
                                    <td>{index + 1}</td>
                                    {/* <td> */}
                                        {/* <div className="flex items-center gap-3"> */}
                                            {/* <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={service.ImageURL} // ✅ সার্ভিস ইমেজ ব্যবহার করা হলো
                                                        alt={service.ServiceName} />
                                                </div>
                                            </div> */}
                                            {/* <div className="font-bold">{booking.ProviderName}</div> */}
                                        {/* </div> */}
                                    {/* </td> */}
                                    <td>
                                        {booking.Email} {/* Category ডেটা যোগ করা উচিত */}
                                    </td>
                                    <td>
                                        {booking.price}
                                    </td>
                                    <td className='space-x-2'>
                                        <button onClick={() => handleDeleteBooking(booking._id)} className="btn btn-sm btn-error">
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

export default MyBookings;