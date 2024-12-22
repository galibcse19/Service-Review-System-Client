import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../assets/BannerImg/1.jpg'
import img2 from '../../assets/BannerImg/2.jpg'
import img3 from '../../assets/BannerImg/3.jpg'
import img4 from '../../assets/BannerImg/4.jpg'
import img5 from '../../assets/BannerImg/5.jpg'
import img6 from '../../assets/BannerImg/6.jpg'

const Banner = () => {
    return (
        <div className='lg:px-40 pb-2 mx-auto '>
             <Carousel>
                <div>
                    <img src={img1} />
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
                <div>
                    <img src={img4} />
                </div>
                <div>
                    <img src={img5} />
                </div>
                <div>
                    <img src={img6} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;