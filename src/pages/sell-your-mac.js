import MacsaleyourComp from '@/components/sell-your-mac/sell_your_mac_comp';
import { NextSeo } from 'next-seo';

export default function sale_mac_page() {
	return (
		<>
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
		</>
	);
}
