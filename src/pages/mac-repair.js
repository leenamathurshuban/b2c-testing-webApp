import "bootstrap/dist/css/bootstrap.min.css";
import MacrepairpageComp from "../components/Mac-repair/mac_repair_page_comp";
import { NextSeo } from "next-seo";

export default function Mac_repair_page() {
  return (
    <>
      <NextSeo
        title='Authorized Mac Computer Repair Shop Near You'
        description='Offering expert Mac computer repair services by authorized technicians near your location.'
        canonical='https://www.applefixpros.com/mac-repair'
        openGraph={{
          type: "website",
          url: "https://www.applefixpros.com/mac-repair",
          title: "Authorized Mac Computer Repair Shop Near You",
          description:
            "Offering expert Mac computer repair services by authorized technicians near your location.",
          images: [
            {
              url: "https://www.applefixpros.com/images/mac-repair-page/mac-repair-banner.png",
              width: 1022,
              height: 600,
              alt: "Apple Fix Pros  | Mac Repair",
            },
          ],
        }}
      />
      <MacrepairpageComp />
    </>
  );
}
