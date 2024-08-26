import React from 'react';
import { Col } from 'react-bootstrap';

export default function MacRepairSkeleton() {
	return (
		<Col
			md={4}
			xs={12}
			className='sell-skl'>
			<div className='card'>
				<div className='card-img skeleton'>
					{/* <!-- waiting for img to load from javascript --> */}
				</div>
				<div className='card-body'>
					<h2 className='card-title skeleton'>
						{/* <!-- wating for title to load from javascript --> */}
					</h2>
					<h2 className='card-title skeleton'>
						{/* <!-- wating for title to load from javascript --> */}
					</h2>
					<h2 className='card-title skeleton'>
						{/* <!-- wating for title to load from javascript --> */}
					</h2>
				</div>
			</div>
		</Col>
	);
}
