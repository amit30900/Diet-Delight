import React from 'react'

import { Container, Btnbox, Btn } from './ExpertElements'
import { Heading, Para } from '../../MainComponents'

const Expertpack = ({ title, data, type, color }) => {
    return (
        <>
            <Container>
                <Heading width="180px" length="1px" size="2rem" back={color}>
                    {title}
                </Heading>
                <Para width="250px" size="0.9rem" weight="600" top="30px">
                    {data}
                </Para>
                <Heading top="35px" color="rgba(137,197,63,1)" length="1px">
                    {type}
                </Heading>
                <Btnbox>
                    <Btn>
                        BOOK YOUR APPOINMENT
                    </Btn>
                </Btnbox>
            </Container>
        </>
    )
}

export default Expertpack
