import React, { ReactChild } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface styledCarouselProps {
    children: ReactChild;
    length: number;
}

const StyledCarousel = ({ children, length }: styledCarouselProps) => {
    var settings = {
        infinite: true,
        slidesToShow: length < 4 ? length === 0 ? 1 : length : length,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      return (
        <Slider {...settings}>
          {children}
        </Slider>
      );
}

export default StyledCarousel