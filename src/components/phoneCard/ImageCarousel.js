import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const ImageCarousel = ({ images }) => {
    // Carousel settings
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...carouselSettings}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Image ${index + 1}`} />
                </div>
            ))}
        </Slider>
    );
};
