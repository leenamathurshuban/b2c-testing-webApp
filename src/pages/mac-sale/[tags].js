import { useGetCollectionsQuery } from "@/appRedux/apiSlice";
import MacSaleHome from "@/components/Mac-sale/MacSaleHome";
import React, { useEffect, useState } from "react";

export default function MacProducts({ webUrl, query }) {
  const { data: collectionData, isLoading: collectionLoading } =
    useGetCollectionsQuery(query.id);

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setCollections(collectionData || []);
      setLoading(collectionLoading);
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
