import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import {
  useGetCollectionsQuery,
  useUpdateCollectionJsonQuery,
} from "@/appRedux/apiSlice";
import MacSaleHome from "@/components/Mac-sale/MacSaleHome";

export default function Macproductpage() {
  const { data: collectionData, isLoading: collectionLoading } =
    useGetCollectionsQuery(process.env.NEXT_PUBLIC_MAC_SALE_ID);
    
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setCollections(collectionData || []);
      setLoading(collectionLoading);
    } catch (error) {
      // console.log(error);
    }
  }, [collectionData, collectionLoading]);

  return (
    <>
      <NextSeo
        title='Buy new and used Mac, Macbook pro, Macbook Air, Mac Pro, and iMac'
        description='Looking for a New Mac? Which Mac is right for you? We sell New and Certified Macs.'
        canonical='https://www.applefixpros.com/mac-sale'
        openGraph={{
          type: "website",
          url: "https://www.applefixpros.com/mac-sale",
          title:
            "Buy new and used Mac, Macbook pro, Macbook Air, Mac Pro, and iMac",
          description:
            "Looking for a New Mac? Which Mac is right for you? We sell New and Certified Macs.",
          images: [
            {
              url: "https://www.applefixpros.com/images/new-mac/n4.png",
              width: 1022,
              height: 600,
              alt: "Apple Fix Pros  | Mac Sale",
            },
          ],
        }}
      />
      <MacSaleHome
        collections={collections}
        loading={loading}
        query={"/mac-sale"}
      />
    </>
  );
}
