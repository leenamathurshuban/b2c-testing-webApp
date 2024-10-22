import Link from 'next/link';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import n1 from '../../../public/assets/images/new-mac/n1.png';
import n2 from '../../../public/assets/images/new-mac/n2.png';

export default function Macsalepcard() {
	return (
		<>
			<Link href='/mac-products'>
				<div className='new_shopmac_box'>
					<div className='new_shopmac_img'>
						<Image
							src={"/assets/no_image.jpg"}
							alt='Apple Fix Pro Mac Img'
							className='img-fluid'
						/>
					</div>
					<div className='new_shopmac_content'>
						<h2>MacBook Air</h2>
					</div>
				</div>
			</Link>
		</>
	);
}

// ====SHOP OUR MAC SECTION END=====
