import React from 'react'
import MealBox from './MealBox';
import { Meal, Mealup, Mealdown } from './MealElements';
import { Heading, Line } from '../../MainComponents'

const Mealplan = () => {

    const meals = [
        {
            title: "10 DAYS",
            selection: "ONLY FOR THE TRAIL PERIOD",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            space: "0",
        },
        {
            title: "2 WEEKS",
            selection: "WITH OR WITHOUT WEEKENDS",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            space: "0",

        },
        {
            title: "1 MONTH",
            selection: "WITH OR WITHOUT WEEKENDS",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            space: "0",

        },
        {
            title: "JUICING PACKAGE",
            selection: " ",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            space: "16px",
        },
    ]

    return (
        <Meal id="plan">
            <Mealup>
                <Heading weight="300" color="purple" length="1px" >
                    CHOOSE YOUR MEAL PLAN
                </Heading>
                <Line back="rgba(137,197,63,1)" width="100px" />
            </Mealup>
            <Mealdown>
                {
                    meals.map((meal) => (
                        <MealBox key={Math.random()} title={meal.title} description={meal.description}
                            selection={meal.selection} space={meal.space} />
                    ))
                }
            </Mealdown>
        </Meal>
    )
}

export default Mealplan
