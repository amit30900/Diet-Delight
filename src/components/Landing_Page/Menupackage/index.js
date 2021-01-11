import React from 'react'
import { Menupack, Packup, Packdown, Downup } from './MenupacakgeElement'

import image1 from '../../../assets/food1.jpg';
import image2 from '../../../assets/food2.jpg';
import image3 from '../../../assets/food3.jpg';
import image4 from '../../../assets/food4.jpg';
import image5 from '../../../assets/food5.jpg';
import image6 from '../../../assets/food6.jpg';
import Menubox from './Menubox';
import { Heading, Subheading, Para, Line } from '../../MainComponents';


const MenuPackage = () => {

    const Mealup = [
        {
            image: image1,
            heading: "FBD",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            image: image2,
            heading: "FULL MEAL",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            image: image3,
            heading: "IMMUNE BOOSTER",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
    ]

    const Mealdown = [
        {
            image: image4,
            heading: "ONE MEAL",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            image: image5,
            heading: "ONE MEAL",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            image: image6,
            heading: "ONE MEAL",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
    ]

    return (

        <>
            <Menupack id="menu">
                <Packup>
                    <Heading size="2rem" color="rgba(137,197,63,1)" length="1px">
                        We use only the finest, freshest farm-to-table ingredients.
                    </Heading>
                    <Subheading size="2rem" color="purple" length="1px">
                        OUR MENU PACKAGE
                    </Subheading>
                    <Line height="5px" back="rgba(137,197,63,1)" />
                    <Para weight="800" width="350px">
                        Our menus are fit--perfectlty balanced, calorie controlled, and portioned to satisfy.
                    </Para>
                </Packup>
                <Packdown>
                    <Downup>
                        {
                            Mealup.map((meal) => (
                                <Menubox
                                    key={Math.random()}
                                    photo={meal.image}
                                    heading={meal.heading}
                                    description={meal.description}
                                />
                            ))
                        }
                    </Downup>
                    <Downup>

                        {
                            Mealdown.map((meal) => (
                                <Menubox
                                    key={Math.random()}
                                    photo={meal.image}
                                    heading={meal.heading}
                                    description={meal.description}
                                />
                            ))
                        }
                    </Downup>
                </Packdown>
            </Menupack>
        </>
    )
}

export default MenuPackage
