import React from 'react'
import expert from '../../../assets/expert.jpg'

import { Main, Expertup, Left, Right, Expertdown } from './ExpertElements'

import { Heading, Subheading, Para, Line, Image } from '../../MainComponents'


import Expertpack from './Expertpack'

const Expert = () => {

    const Experts = [
        {
            title: "SILVER",
            color: "silver",
            data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            type: "BD 20"
        },
        {
            title: "GOLD",
            color: "#d3ad7e",
            data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            type: "BD 40"
        },
        {
            title: "PLATNIUM",
            color: "#e5e4e2",
            data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            type: "BD 60"
        },
    ]

    return (
        <>
            <Main id='expert'>
                <Expertup>
                    <Left>
                        <Heading color="purple" length="1px" align="none">
                            TALK TO OUR EXPERT
                    </Heading>
                        <Subheading color="rgba(137,197,63,1)" align="none" >
                            Consulting Package
                    </Subheading>
                        <Line height="4px" width="90px" back="rgba(137,197,63,1)" />
                        <Para align="none" size="0.9rem" weight="600">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Para>
                    </Left>
                    <Right>
                        <Image alt="expertImage" fit="cover" height="280px" width="400px"
                            Mwidth="300px" Mheight="250px" src={expert} />
                    </Right>
                </Expertup>
                <Expertdown>
                    {
                        Experts.map((expert) => (
                            <Expertpack
                                key={Math.random() * 100}
                                title={expert.title}
                                data={expert.data}
                                type={expert.type}
                                color={expert.color}
                            />
                        ))
                    }
                </Expertdown>
            </Main>
        </>
    )
}

export default Expert
