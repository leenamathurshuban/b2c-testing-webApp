import SingleproductComp from "@/components/Mac-sale/single_product";

export default function MacProducts({ query, webUrl }) {
  
  return (
    <>
      <SingleproductComp webUrl={webUrl} query={query}/>
    </>
  );
}

export async function getServerSideProps({ query, resolvedUrl }) {
  return { props: { query, webUrl: resolvedUrl } };
}
