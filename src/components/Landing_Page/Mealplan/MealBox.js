import React from 'react'
import { Mealbox, Mealbtn, Mealbtnbox } from './MealElements'

import { Heading, Subheading, Para } from '../../MainComponents'

const MealBox = ({ title, selection, description, space }) => {
    return (
        <Mealbox>
            <Heading color="white" length="1px" weight="300">{title}</Heading>
            <Subheading color="white" length="1px" weight="200" size="1.5rem"> {selection} </Subheading>
            <Para color="white" size="0.9rem" width="210px"> {description}   </Para>
            <Mealbtnbox>
                <Mealbtn to="/"> SUBSCRIPTION </Mealbtn>
            </Mealbtnbox>
        </Mealbox>
    )
}

export default MealBox
