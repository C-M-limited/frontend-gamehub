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
        slidesToShow: length < 4 ? length === 0 ? 1 : 3 : length,
        slidesToScroll: 1,
        centerMode: true,
        arrows: true,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
              centerMode: false,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true,
              centerMode: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
              centerMode: false,
            },
          },
        ]
      };
      return (
        <Slider {...settings}>
          {children}
        </Slider>
      );
}

export default StyledCarousel