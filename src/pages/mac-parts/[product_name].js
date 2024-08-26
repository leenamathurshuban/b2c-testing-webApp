import SingleproductComp from "@/components/Mac-sale/single_product";

export default function HomePage({ webUrl }) {
  return (
    <>
      <SingleproductComp webUrl={webUrl} />
    </>
  );
}

export async function getServerSideProps({ resolvedUrl }) {
  return { props: { webUrl: resolvedUrl } };
}
