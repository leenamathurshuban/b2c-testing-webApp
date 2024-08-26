import MacSaleProducts from "@/components/Mac-sale/mac-sale-products";
import React from "react";

export default function MacProducts({ webUrl, query }) {
  return <MacSaleProducts webUrl={webUrl} query={query} />;
}

export async function getServerSideProps({ query, resolvedUrl }) {
  return { props: { webUrl: resolvedUrl, query } };
}
