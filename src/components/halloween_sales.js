import React from 'react';
import { Container } from "react-bootstrap";
import Image from "next/image";
import offer_banner from "../../public/images/banner/halloween_banner1.jpg";
import offer_bannerxs from "../../public/images/banner/halloween_banner_xs.jpg";
import CountdownTimer from './Home/CountdownTimer';
const Halloween_Sales = () => {
    return (
        <div className='offer_banner'>
            <Image src={offer_banner} alt="Apple Fix Pro" className="img-fluid xs-hide" />
            <Image src={offer_bannerxs} alt="Apple Fix Pro" className="img-fluid md-hide" />
            <div className='count_banner'>
                <CountdownTimer/>
            </div>
        </div>
    );
  };

export default Halloween_Sales;
