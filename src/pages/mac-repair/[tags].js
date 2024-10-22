import MacproductsComp from "@/components/Mac-repair/mac_repair_products";

export default function Mac_sell_page({ webUrl }) {
  return (
    <>
      <MacproductsComp webUrl={webUrl} />
    </>
  );
}

export async function getServerSideProps({ resolvedUrl }) {
  return { props: { webUrl: resolvedUrl } };
}
