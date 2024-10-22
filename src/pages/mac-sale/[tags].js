import { useGetCollectionsQuery } from "@/appRedux/apiSlice";
import MacSaleHome from "@/components/Mac-sale/MacSaleHome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function MacProducts({ webUrl, query }) {
  const router = useRouter();
  const { data: collectionData, isLoading: collectionLoading } =
    useGetCollectionsQuery(query.id);

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (!collectionData.length) {        
        router.push(`/mac-sale/${query.tags}/${query.tags}?id=${query?.id}`)
        router.replace(`/mac-sale`)
      } else {
        setCollections(collectionData || []);
        setLoading(collectionLoading);
      }
    } catch (error) {
      // console.log(error.message);
    }
  }, [collectionData, collectionLoading]);

  return (
    <>
      <MacSaleHome
        collections={collections}
        loading={loading}
        query={`/mac-sale/${query.tags}`}
      />
    </>
  );
}

export async function getServerSideProps({ query, resolvedUrl }) {
  return { props: { webUrl: resolvedUrl, query } };
}
