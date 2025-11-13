import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

// স্লাইড ডেটা সংজ্ঞায়িত করা
const services = [
    {
        id: 1,
        name: "Aci Repair Service",
        headline: <>Aci <span className="text-blue-500">Repair</span></>,
        details: "Complete jet pump cleaning, gas level check, and minor repair assessment for split/window AC.",
        image: "https://i.ibb.co.com/hxdPRfcm/aci-repair.png",
        colorClass: "text-blue-600",
        hoverClass: "hover:bg-blue-700",
        bgColor: "bg-blue-500",
    },
    {
        id: 2,
        name: "ওয়েব ডেভেলপমেন্ট",
        headline: <>Carpet <span className="text-blue-500">Cleaning</span> </>,
        details: "Steam or foam cleaning for large area rugs or wall-to-wall carpets (up to 100 sq ft).",
        image: "https://i.ibb.co.com/CszcsFXP/images-6.jpg",
        colorClass: "text-emerald-600",
        hoverClass: "hover:bg-emerald-700",
        bgColor: "bg-blue-500",
    },
    {
        id: 3,
        name: "গ্রাফিক ডিজাইন",
        headline: <>Bathroom <span className="text-blue-500">Cleaning</span></>,
        details: "Intense cleaning of tiles, grout, commode, sink, and shower area. Includes sanitization.",
        image: "https://i.ibb.co.com/MDqKnZxB/bathroom-deep-cleaning-1.jpg",
        colorClass: "text-amber-600",
        hoverClass: "hover:bg-amber-700",
        bgColor: "bg-blue-500",
    },
];

// স্লাইড শো কম্পোনেন্ট
const App = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [message, setMessage] = useState('');
    const [messageVisible, setMessageVisible] = useState(false);
    const autoPlayRef = useRef();

    const slideCount = services.length;

    // স্লাইড পরিবর্তনে লুপ ম্যানেজ করা
    const goToSlide = useCallback((index) => {
        let newIndex = index;
        if (index < 0) {
            newIndex = slideCount - 1; // লুপ পিছনে
        } else if (index >= slideCount) {
            newIndex = 0; // লুপ সামনে
        }
        setCurrentSlide(newIndex);
    }, [slideCount]);

    const nextSlide = useCallback(() => {
        goToSlide(currentSlide + 1);
    }, [currentSlide, goToSlide]);

    const prevSlide = () => {
        goToSlide(currentSlide - 1);
    };

    // অটো-প্লে সেটআপ
    useEffect(() => {
        autoPlayRef.current = setInterval(nextSlide, 3000); // প্রতি ৩ সেকেন্ডে স্লাইড পরিবর্তন

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [nextSlide]);

    // স্লাইড ইন্টারেকশন হলে অটো-প্লে রিসেট করা
    const resetAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = setInterval(nextSlide, 3000);
        }
    };

    const handleExplore = (serviceName) => {
        setMessage(`পরিষেবা পৃষ্ঠায় পুনঃনির্দেশিত করা হবে: ${serviceName}। (Redirecting to service page: ${serviceName})`);
        setMessageVisible(true);
        resetAutoPlay(); // ইন্টারেকশন হওয়ায় অটো-প্লে রিসেট করা

        // ৩ সেকেন্ড পর মেসেজ হাইড করা
        setTimeout(() => {
            setMessageVisible(false);
            setMessage('');
        }, 3000);
    };

    // রেন্ডারিং স্লাইড ডট
    const renderDots = () => (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {services.map((_, index) => (
                <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 focus:outline-none ${
                        index === currentSlide ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => {
                        resetAutoPlay();
                        goToSlide(index);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    );

    // স্লাইডার কন্টেইনারে মাউস এন্টার/লিভ ইভেন্ট হ্যান্ডলার
    const handleMouseEnter = () => clearInterval(autoPlayRef.current);
    const handleMouseLeave = resetAutoPlay;

    return (
        <div className=" bg-gray-50 p-4 md:p-4">
            {/* Message Box */}
            <div
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 text-white rounded-lg shadow-xl z-50 transition-opacity duration-500 
                ${messageVisible ? 'opacity-100 bg-blue-600' : 'opacity-0 pointer-events-none bg-blue-600'}`}
                role="alert"
            >
                {message}
            </div>

            {/* Hero Slider Section */}
            <div
                id="hero-slider"
                className="relative w-full overflow-hidden max-w-7xl mx-auto rounded-xl shadow-2xl mt-8 bg-white"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                
                {/* Slider Track Container */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="flex-shrink-0 w-full p-4 md:p-10 lg:p-16"
                        >
                            <div className="md:flex items-center">
                                {/* Service Image (Wider on mobile, half-width on desktop) */}
                                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-10 lg:pr-16">
                                    <img
                                        src={service.image}
                                        alt={service.name + " সার্ভিস ইমেজ"}
                                        className="w-full h-auto rounded-lg shadow-xl object-cover aspect-video"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/cccccc/333333?text=Image+Load+Error'; }}
                                    />
                                </div>
                                {/* Service Content */}
                                <div className="md:w-1/2">
                                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                                        {service.headline}
                                    </h2>
                                    <p className="text-gray-600 text-lg mb-8">
                                        {service.details}
                                    </p>
                                    <Link to='/services'
                                        onClick={() => handleExplore(service.name)}
                                        className={`
                                            ${service.bgColor} text-white font-semibold py-3 px-8 rounded-full shadow-lg 
                                            transition duration-300 transform hover:scale-105 ${service.hoverClass}
                                        `}
                                    >
                                        Explore
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons (Desktop Only) */}
                <button
                    onClick={() => { resetAutoPlay(); prevSlide(); }}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-700 p-3 rounded-full shadow-xl hover:bg-gray-100 transition duration-300 focus:outline-none hidden md:block z-10"
                    aria-label="Previous Slide"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => { resetAutoPlay(); nextSlide(); }}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-700 p-3 rounded-full shadow-xl hover:bg-gray-100 transition duration-300 focus:outline-none hidden md:block z-10"
                    aria-label="Next Slide"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>

                {/* Pagination Dots */}
                {renderDots()}
            </div>
        </div>
    );
};

export default App;
