
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AllService from '../pages/AllService';
import { useLoaderData } from 'react-router';

const Services = () => {
  const initialServices = useLoaderData();
  const [services, setServices] = useState(initialServices || []);
  const [loading, setLoading] = useState(false);

  // Filter & Sort states
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // ✅ Apply Filter Button Handler
  const handleFilter = (e) => {
    e.preventDefault();
    setLoading(true);

    let url = `https://home-hero-server.onrender.com/services/filter?`;
    if (minPrice) url += `minPrice=${minPrice}&`;
    if (maxPrice) url += `maxPrice=${maxPrice}&`;
    if (sortOrder) url += `order=${sortOrder}`;

    // Remove trailing &
    if (url.endsWith('&')) url = url.slice(0, -1);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching filtered data:", error);
        setLoading(false);
      });
  };

//   // ✅ Reset Button
//   const handleReset = () => {
//     setMinPrice('');
//     setMaxPrice('');
//     setSortOrder('');
//     setServices(initialServices);
//   };

  if (loading)
    return <span className="loading loading-spinner loading-lg mx-auto block mt-20"></span>;

  return (

    <div>
        <div>
            <Navbar></Navbar>
        </div>
        <div className="w-10/12 mx-auto">
    
      {/* 🔹 Filter & Sort Form */}
      <form
        onSubmit={handleFilter}
        className="mb-8 p-6 bg-white shadow-xl rounded-xl flex flex-wrap justify-center my-10 gap-6 items-center border-t-4 border-sky-500"
      >
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="input input-bordered w-full md:w-52 focus:ring-sky-500"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="input input-bordered w-full md:w-52 focus:ring-sky-500"
        />

  

        <button type="submit" className="btn btn-success">Apply Filter</button>
   
      </form>

      {/* 🔹 Render Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {services && services.length > 0 ? (
          services.map((service) => (
            <AllService key={service._id} service={service}></AllService>
          ))
        ) : (
          <p className="text-center col-span-full text-xl text-red-500 p-10 bg-red-50 rounded-lg">
            No services found in this range.
          </p>
        )}
      </div>

      <Footer />
    </div>
    </div>
  );
};

export default Services;