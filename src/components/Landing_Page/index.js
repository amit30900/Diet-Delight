import React from 'react'

import Home from './Home';
import Mealplan from './Mealplan';
import MealPackage from './Menupackage';
import Feature from './Feature';
import Expert from './Expert';
import Work from './Work';
import Rating from './Rating';
import Downlaod from './download'
import Footer from './Footer'

const LandingPage = () => {
    return (
        <>
            <Home />
            <MealPackage />
            <Mealplan />
            <Feature />
            <Expert />
            <Work />
            <Rating />
            <Downlaod />
            <Footer />
        </>
    )
}

export default LandingPage
