import React from 'react';
import { Outlet } from 'react-router';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

const Root = () => {
    return (
        <div>
            <navbar>
                <Navbar></Navbar>
                 <Hero></Hero>
            </navbar>
            <main>
            <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Root;