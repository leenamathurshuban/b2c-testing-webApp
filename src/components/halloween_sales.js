import React from 'react';
import { useState } from 'react';
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import offer_banner from "../../public/images/banner/thankgiving_banner.jpg";
import offer_blackfriday from "../../public/images/banner/blackfriday_banner.jpg";
import offer_bannerxs from "../../public/images/banner/thanks_day_sx.jpg";
import blackfridayxs from "../../public/images/banner/blackfriday_sx.jpg";
import happyvctr from "../../public/images/banner/happy_vactor.png";
import CountdownTimer from './Home/CountdownTimer';
import Link from 'next/link';
const Halloween_Sales = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
    return (
        <div className='offer_banner'>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <Image src={offer_banner} alt="Apple Fix Pro" className="img-fluid xs-hide" />
                    <Image src={offer_bannerxs} alt="Apple Fix Pro" className="img-fluid md-hide" />
                    <div className='count_banner'>
                        <CountdownTimer/>
                        <Link href='/#shop-now' className='btn-shopnow'>Shop Now</Link>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={offer_blackfriday} alt="Apple Fix Pro" className="img-fluid xs-hide" />
                    <Image src={blackfridayxs} alt="Apple Fix Pro" className="img-fluid md-hide" />
                    <div className='count_banner'>
                        <CountdownTimer/>
                        <Link href='/#shop-now' className='btn-shopnow'>Shop Now</Link>
                    </div>
                </Carousel.Item>
            </Carousel>
            
        </div>
    );
  };

export default Halloween_Sales;
