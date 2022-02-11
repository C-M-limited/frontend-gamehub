import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Paper, Button, Box, Grid, Typography } from '@mui/material'
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Carousel from 'react-material-ui-carousel';

function StyledBanner() {

    const items = [
        {
            name: "/banner_1.jpg",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "/banner_2.jpg",
            description: "Hello World!"
        }
    ]

    return (
        <div style={{ position: 'relative', marginTop: 10 }}>
            <Carousel indicators={false} navButtonsAlwaysVisible>
                {
                    items.map( (item, i) => (
                        <div key={i}>
                            <Image
                                src={item.name}
                                alt="Picture of the author"
                                layout='responsive'
                                height={800}
                                width={1900}
                                placeholder="blur"
                                blurDataURL={item.name}
                            />
                        </div>
                    ) )
                }
            </Carousel>
        </div>
    )
}

export default StyledBanner