import HomeComp from "@/components/Home";
import Maintenance from "@/components/Maintenance/maintenance";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo
        title='Apple Fix Pros: Buy, Sell and Repair Your Mac'
        description='Apple Fix Pros offers a wide range of fixed-price repairs and upgrades for your Mac computers, including MacBooks, iMacs, Mac Pros, and Mac. experienced technicians can fix any problem, from a cracked screen to a faulty hard drive.'
        canonical='https://www.applefixpros.com'
        openGraph={{
          type: "website",
          url: "https://www.applefixpros.com",
          title: "Apple Fix Pros: Buy, Sell and Repair Your Mac",
          description:
            "Apple Fix Pros offers a wide range of fixed-price repairs and upgrades for your Mac computers, including MacBooks, iMacs, Mac Pros, and Mac. experienced technicians can fix any problem, from a cracked screen to a faulty hard drive.",
          images: [
            {
              url: "https://afp-frontend-next.vercel.app/icons/OGImage.png",
              width: 1022,
              height: 600,
              alt: "Apple Fix Pros  | Buy, Sell, & Repair Mac",
            },
          ],
        }}
      />
      <main>
        {/* <Maintenance /> */}
        <HomeComp />
      </main>
    </>
  );
}
