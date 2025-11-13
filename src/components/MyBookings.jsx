

import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import Footer from './Footer';

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
      fetch(`home-hero-server-henna.vercel.app/bookings?email=${user?.email}`)
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
      <div className='w-full md:w-10/12 md:mx-auto'>
        <h1 className='text-center my-5 text-2xl font-bold'>
          My Bookings: {bookings.length}
        </h1>

        <div className="overflow-x-auto border mx-1 rounded-lg shadow-lg">
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
                      className="btn btn-sm mb-2 btn-error"
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
      <div className='mt-4'>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MyBookings;