import React from 'react';
import { Container } from "react-bootstrap";
import Image from "next/image";
import offer_banner from "../../public/images/banner/halloween_banner2.jpg";
import offer_bannerxs from "../../public/images/banner/halloween_banner_xs.jpg";
import happyvctr from "../../public/images/banner/happy_vactor.png";
import CountdownTimer from './Home/CountdownTimer';
import Link from 'next/link';
const Halloween_Sales = () => {
    return (
        <div className='offer_banner'>
            <Image src={offer_banner} alt="Apple Fix Pro" className="img-fluid xs-hide" />
            <Image src={offer_bannerxs} alt="Apple Fix Pro" className="img-fluid md-hide" />
            <div className='count_banner'>
                <Image src={happyvctr} alt="Apple Fix Pro" className="happy_vtr xs-hide" />
                <h1 className='xs-hide'>HALLOWEEN</h1>
                <CountdownTimer/>
                <p className='text-discount'>up to <span className='text-denger'>15% off</span></p>
                <Link href='/#shop-now' className='btn-shopnow'>Shop Now</Link>
            </div>
        </div>
    );
  };

export default Halloween_Sales;
