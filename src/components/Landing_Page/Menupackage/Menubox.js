import React from 'react'
import { Menu, MenubtnBox, Menubtn } from './MenupacakgeElement'

import { Heading, Image, Line, Para } from '../../MainComponents'


const Menubox = ({ photo, heading, description }) => {
    return (
        <>
            <Menu>
                <Image alt="mealbox" src={photo} />
                <Heading color="purple" length="1px" size="2rem">
                    {heading}
                </Heading>
                <Line back="rgba(137,197,63,1)" width="100px" />
                <Para size="0.8rem" weight="800" width="250px">
                    {description}
                </Para>
                <MenubtnBox to="/">
                    <Menubtn>
                        VIEW MENU
                    </Menubtn>
                </MenubtnBox>
            </Menu>
        </>
    )
}

export default Menubox
