

import React, { use, useRef } from 'react';
import { useLoaderData } from 'react-router';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
    const  service  = useLoaderData();

    const {_id: bookingId} = service

    const { user } = use(AuthContext);
    console.log(user.email)

    const modalRef = useRef(null);
    const handleModal = () => {
        modalRef.current.showModal();
        
    }


    const handlebooking = (e) => {
        e.preventDefault();
        
        const email = e.target.email.value;
        const price = e.target.price.value;
        console.log(bookingId, email, price)

        const newBooking = {
            booking: bookingId,
            Email: email
        }

               if (user.email === email) {
            alert('You cant book this service, because you are the provider');
            return;
        }
        

        fetch('http://localhost:3000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBooking)
        })
            .then(res => res.json())
            .then(data => {
          
                console.log(data)
                
                Swal.fire({
            title: "Booking Successfully",
            icon: "success",
            draggable: true
        });
            })


    }




    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='flex justify-center gap-10 my-10'>
                <div>

                <div>
                    <h3 className='text-center font-bold mb-2'>{service.ServiceName}</h3>
                   <img className="h-[250px] w-full" src={service.ImageURL} alt="" srcset="" />
                   <h2 className='font-bold'>{service.Category}</h2>
                   <p className='text-sm'>{service.Description}</p>
                   <div className='text-[12px] flex justify-between my-2 font-bold'>
                    <p> {service.Price}</p>
                    <p>Provider: {service.ProviderName}</p>
                    </div>
                    <div>
                <button onClick={handleModal} className='btn btn-primary w-full'>Book Now</button>
            </div>
                </div>
            </div>
            
            </div>
            <div>


                <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Booking Service</h3>
                        <form onSubmit={handlebooking}>
                            <fieldset className="fieldset">


                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" readOnly defaultValue={user.email} />

                                {/* <label className="label">Service ID</label>
                                <input type="text" name='serviceId' className="input" /> */}

                                {/* <label className="label">Booking Date</label>
                                <input type="text" name='bookingDate' className="input" /> */}

                                <label className="label">Price</label>
                                <input type="text" name='price' className="input" />

                                <button className="btn btn-neutral mt-4">Book your Service</button>
                            </fieldset>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Cancle</button>
                            </form>
                        </div>
                    </div>
                </dialog>

            </div>
        </div>
    );
};

export default ServiceDetails;











 