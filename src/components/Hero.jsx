import React from 'react';
import 'swiper/css';
import pic1 from '../assets/home1.jpg'
import pic2 from '../assets/home2.jpeg'
import pic3 from '../assets/home3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router';



const Hero = () => {
    return (

   <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img className='w-full h-[500px] object-fill' src={pic1} alt="image1" srcset="" />
      </SwiperSlide>
      <SwiperSlide>
        <img className='w-full h-[500px] object-fill' src={pic2} alt="" srcset="" />
      </SwiperSlide>
      <SwiperSlide>
        <img className='w-full h-[500px] object-fill' src={pic3} alt="" srcset="" />
      </SwiperSlide>
      <div className="text-center mx-auto border text-xl shadow-2xl border-gray-200 mb-8">
        <Link to ='/services'>Explore</Link>
      </div>
      
    </Swiper>


    );
};

export default Hero;