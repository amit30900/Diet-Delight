import React from 'react'
import { Feat, FeatIcons, Set, Banner, Bannerup, Left, Right, Bannermid, Bannerdown, IconBox, Call, Whatsapp, Message } from './FeatureElement'

import { Heading, Line, Para } from '../../MainComponents'

import FeatureList from './FeatureList'
import feat1 from '../../../assets/feature1.jpg'
import feat2 from '../../../assets/feature2.jpg'
import feat3 from '../../../assets/feature3.jpg'


const Feature = () => {

    const Featured = [
        {
            image: feat1,
            name: "Honey Garlic Chicken Stir Fry",
        },
        {
            image: feat2,
            name: "Crunchy Chickpea Salad",
        },
        {
            image: feat3,
            name: "White Fish with Pomegranate Salsa",
        },
    ]

    return (
        <>
            <Feat>
                <Heading color="purple" length="1px" >
                    FEATURED MENU OF THE WEEK
                </Heading>
                <Line back="rgba(137,197,63,1)" />
                <Set>
                    {
                        Featured.map((meal) => (
                            <FeatureList
                                key={Math.random() * 100}
                                photo={meal.image}
                                name={meal.name}
                            />
                        ))
                    }
                </Set>
            </Feat>
            <Banner>
                <Bannerup>
                    <Left>
                        <div style={{ marginRight: "20px", marginBottom: "10px" }}>
                            <Set>
                                <Heading color="white" size="2rem">
                                    SPECIAL
                        </Heading>
                            </Set>
                            <Set>
                                <Heading top="0" color="white" size="2rem">
                                    OFFER
                        </Heading>
                            </Set>
                        </div>
                    </Left>
                    <Right>
                        <Heading color="white" length="1px">
                            FAMILY PACAKAGE
                        </Heading>
                    </Right>
                </Bannerup>
                <Bannermid>
                    <Para top="0" color="white" align="none" Mwidth="300px;">
                        Having Diet Delight with your family is great oppurtunity to bond with each other. Diet Deight provides special 'Family Package' so that the harmony within the family last forever.
                    </Para>
                </Bannermid>
                <Bannerdown>
                    <Para top="0" color="white" align="none">
                        Contact us to get more information.
                    </Para>
                    <FeatIcons>
                        <IconBox>
                            <Call />
                        </IconBox>
                        <IconBox>
                            <Whatsapp />
                        </IconBox>
                        <IconBox>
                            <Message />
                        </IconBox>
                    </FeatIcons>
                </Bannerdown>
            </Banner>
        </>
    )
}

export default Feature
