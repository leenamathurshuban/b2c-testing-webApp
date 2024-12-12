import { useGetCollectionsQuery } from '@/appRedux/apiSlice';
import { Findyourdevice } from '@/components/sell-your-mac/find_your_device';
import MacsaleyourComp from '@/components/sell-your-mac/sell_your_mac_comp';
import { NextSeo } from 'next-seo';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export default function sale_mac_system() {
	const { data: collectionData, isLoading: collectionLoading } =
		useGetCollectionsQuery(process.env.NEXT_PUBLIC_MAC_SALE_ID || 120);
	const [collections, setCollections] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {			
			const filterData = collectionData?.filter((Val)=>Val?.name != "Hard Drives &amp; Storage" && Val?.name != "Headphones &amp; Speakers" && Val?.name != "Mac Accessories" && Val?.name != "Used (Blowout Deals)")
			setCollections(filterData || []);
			setLoading(collectionLoading);
		} catch (error) {
			// console.log(error.message);
		}
	}, [collectionData, collectionLoading]);
	return (
		<>
            <ToastContainer />
			<NextSeo
				title='Sell your used Mac, Macbook pro, Macbook Air, Mac Pro, and iMac'
				description='Looking to sell Your Mac? Apple Fix Pros will buy your MacBook Air, MacBook Pro, iMac and Mac Mini products.'
				canonical='https://www.applefixpros.com/sell-your-mac'
				openGraph={{
					type: 'website',
					url: 'https://www.applefixpros.com/sell-your-mac',
					title:
						'Sell your used Mac, Macbook pro, Macbook Air, Mac Pro, and iMac',
					description:
						'Looking to sell Your Mac? Apple Fix Pros will buy your MacBook Air, MacBook Pro, iMac and Mac Mini products.',
					images: [
						{
							url: 'https://www.applefixpros.com/images/shopmac-section/s1.png',
							width: 1022,
							height: 600,
							alt: 'Apple Fix Pros  | Sell Your Mac',
						},
					],
				}}
			/>
			<MacsaleyourComp />
			<Findyourdevice data={collections} />
		</>
	);
}