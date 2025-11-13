import React, { useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
  const [isBooked, setBooked] = useState(false);
  const service = useLoaderData();
  const { user } = React.useContext(AuthContext);

  const modalRef = useRef(null);
  const handleModal = () => modalRef.current.showModal();

  const handleBooking = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const price = e.target.price.value;

    const newBooking = {
      booking: service._id,
      Email: email,
      price
    };

    if (user.email === service.Email) {
      alert("You can't book this service because you are the provider");
      return;
    }

    fetch('home-hero-server-henna.vercel.app/bookings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newBooking)
    })
      .then(res => res.json())
      .then(() => {
        setBooked(true);
        Swal.fire({
          title: "Booking Successful",
          icon: "success",
          draggable: true
        });
      });
  };

  return (
    <div>
      <Navbar />

      <div className="w-11/12 mx-auto my-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Service Info */}
          <div className="flex-1">
            <h3 className="text-center font-bold text-2xl mb-2">{service.ServiceName}</h3>
            <img
              className="h-[250px] w-full object-cover rounded-lg"
              src={service.ImageURL}
              alt={service.ServiceName}
            />
            <h2 className="font-semibold mt-3">{service.Category}</h2>
            <p className="text-sm mt-1">{service.Description}</p>
            <div className="flex justify-between my-2 font-bold text-sm">
              <p>Price: {service.Price}</p>
              <p>Provider: {service.ProviderName}</p>
            </div>
            <button onClick={handleModal} className="btn btn-primary w-full mt-3">
              Book Now
            </button>
          </div>

          {/* Reviews Section */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3">Reviews</h3>
            {service.reviews && service.reviews.length > 0 ? (
              <div className="space-y-4">
                {service.reviews.map((rev, idx) => (
                  <div key={idx} className="border p-3 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold">{rev.userEmail}</p>
                      <p className="text-yellow-500 font-bold">{'⭐'.repeat(rev.rating)}</p>
                    </div>
                    <p>{rev.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {!isBooked && (
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Book This Service</h3>
            <form onSubmit={handleBooking} className="space-y-3">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                readOnly
                defaultValue={user.email}
              />

              <label className="label">Price</label>
              <input type="text" name="price" className="input input-bordered w-full" defaultValue={service.Price} />

              <label className="label">Booking Date</label>
              <input type="date" name="bookingDate" className="input input-bordered w-full" required />

              <div className="modal-action flex justify-between mt-4">
                <button type="submit" className="btn btn-primary w-full mr-2">Book Now</button>
                <form method="dialog">
                  <button className="btn btn-outline w-full ml-2">Cancel</button>
                </form>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ServiceDetails;






 