import MacrpartpageComp from "@/components/Mac-parts/mac_parts_page_comp";
import { NextSeo } from "next-seo";

export default function Macpartspage() {
  return (
    <>
      <NextSeo
        title='Buy Mac Parts, Macbook Pro & Macbook Air Parts, iMac Replacement Parts'
        description='Get your Mac up and running again with our selection of top-notch Mac parts, from Macbook Pro to iMac replacement parts.'
        canonical='https://www.applefixpros.com/mac-parts'
        openGraph={{
          type: "website",
          url: "https://www.applefixpros.com/mac-parts",
          title:
            "Buy Mac Parts, Macbook Pro & Macbook Air Parts, iMac Replacement Parts",
          description:
            "Get your Mac up and running again with our selection of top-notch Mac parts, from Macbook Pro to iMac replacement parts.",
          images: [
            {
              url: "https://www.applefixpros.com/images/macparts-img/mac-parts-2.png",
              width: 1022,
              height: 600,
              alt: "Apple Fix Pros  | Mac Parts",
            },
          ],
        }}
      />
      <MacrpartpageComp />
    </>
  );
}
