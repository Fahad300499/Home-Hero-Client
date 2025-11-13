// import React, { use, useEffect, useState } from 'react';
// import Navbar from './Navbar';
// import { AuthContext } from '../context/AuthProvider';
// import Swal from 'sweetalert2';
// import { Link } from 'react-router';

// const MyBookings = () => {
//     const { user } = use(AuthContext)
//         const [bookings, setBookings] = useState([]);

//     useEffect(() => {
//                 if (user?.email) {
        
//                     fetch(`http://localhost:3000/bookings?email=${user?.email}`)
//                         .then(res => res.json())
//                         .then(data => {
//                             console.log(data)
//                             setBookings(data)
//                         })
//                 }
//             }, [user?.email])


//             const handleDeleteBooking = (_id) => {
//                     Swal.fire({
//                         title: "Are you sure?",
//                         text: "You won't be able to revert this!",
//                         icon: "warning",
//                         showCancelButton: true,
//                         confirmButtonColor: "#3085d6",
//                         cancelButtonColor: "#d33",
//                         confirmButtonText: "Yes, delete it!"
//                     }).then((result) => {
//                         if (result.isConfirmed) {
            
//                             fetch(`http://localhost:3000/bookings/${_id}`, {
//                                 method: 'DELETE',
//                             })
//                             .then(res=>res.json())
//                             .then(data=>{
//                                 console.log('after deleted', data)
//                                 if(data.deleteCount){
//                                          Swal.fire({
//                                 title: "Deleted!",
//                                 text: "Your file has been deleted.",
//                                 icon: "success"
//                             });
//                                 }
                               
//                             })
//                             const remainingBooking = bookings.filter(booking=> booking._id !== _id)
//                             setBookings(remainingBooking)
            
                            
                            
//                         }
//                     });
//                 }
        

//     return (
//          <div>
//             <Navbar />
//             <div className='w-11/12 mx-auto'>
//                 <h1 className='text-center my-5 text-2xl font-bold'>My Bookings: {bookings.length}</h1>

//                 {/* ✅ ১. টেবিলের কাঠামো লুপের বাইরে একবার তৈরি হলো */}
//                 <div className="overflow-x-auto border rounded-lg shadow-lg">
//                     <table className="table table-zebra w-full">
//                         <thead>
                            
//                                 <th>#</th>
//                                 {/* <th>Provider Name</th> Service Name ও Image একসাথে */}
//                                 <th>Email</th>
//                                 <th>Price</th>
//                                 <th>Action</th>
                            
//                         </thead>
//                         <tbody>
//                             {/* ✅ ২. শুধুমাত্র রো (<tr>) গুলি লুপের ভেতরে থাকবে */}
//                             {bookings.map((booking, index) => (
//                                 <tr key={booking._id}>
//                                     <td>{index + 1}</td>
//                                     {/* <td> */}
//                                         {/* <div className="flex items-center gap-3"> */}
//                                             {/* <div className="avatar">
//                                                 <div className="mask mask-squircle h-12 w-12">
//                                                     <img
//                                                         src={service.ImageURL} // ✅ সার্ভিস ইমেজ ব্যবহার করা হলো
//                                                         alt={service.ServiceName} />
//                                                 </div>
//                                             </div> */}
//                                             {/* <div className="font-bold">{booking.ProviderName}</div> */}
//                                         {/* </div> */}
//                                     {/* </td> */}
//                                     <td>
//                                         {booking.Email} {/* Category ডেটা যোগ করা উচিত */}
//                                     </td>
//                                     <td>
//                                         {booking.price}
//                                     </td>
//                                     <td className='space-x-2'>
//                                         <button onClick={() => handleDeleteBooking(booking._id)} className="btn btn-sm btn-error">
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyBookings;

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const { user } = React.useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const modalRef = useRef(null);

  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  // Fetch bookings for logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bookings?email=${user?.email}`)
        .then(res => res.json())
        .then(data => setBookings(data))
        .catch(err => console.error(err));
    }
  }, [user?.email]);

  // Delete booking
  const handleDeleteBooking = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bookings/${_id}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              Swal.fire("Deleted!", "Your booking has been deleted.", "success");
              setBookings(bookings.filter(b => b._id !== _id));
            }
          });
      }
    });
  };

  // Open review modal
  const handleOpenReview = (booking) => {
    setSelectedBooking(booking);
    setRating('');
    setReview('');
    modalRef.current.showModal();
  };

  // Submit review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!selectedBooking) return;

    const reviewData = {
      rating,
      message: review,
      userEmail: user.email
    };

    fetch(`http://localhost:3000/services/review/${selectedBooking.booking}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire("Thank you!", "Your review has been submitted.", "success");
        modalRef.current.close();
        setRating('');
        setReview('');
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Error", "Failed to submit review.", "error");
      });
  };

  return (
    <div>
      <Navbar />
      <div className='w-11/12 mx-auto'>
        <h1 className='text-center my-5 text-2xl font-bold'>
          My Bookings: {bookings.length}
        </h1>

        <div className="overflow-x-auto border rounded-lg shadow-lg">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.Email}</td>
                  <td>{booking.price}</td>
                  <td className='space-x-2'>
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleOpenReview(booking)}
                      className="btn btn-sm btn-success"
                    >
                      Give Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Review Modal */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-center">
              Review for Service
            </h3>

            <form onSubmit={handleSubmitReview}>
              <label className="label">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={e => setRating(e.target.value)}
                required
                className="input input-bordered w-full"
              />

              <label className="label mt-3">Your Review</label>
              <textarea
                value={review}
                onChange={e => setReview(e.target.value)}
                required
                className="textarea textarea-bordered w-full"
                placeholder="Write your review here..."
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Submit</button>
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyBookings;