import SingleproductComp from "../../../components/Mac-repair/repair_form";

export default function HomePage({webUrl}) {
  return (
    <>
      <SingleproductComp webUrl={webUrl}/>
    </>
  );
}

export async function getServerSideProps({ resolvedUrl }) {
	return { props: { webUrl: resolvedUrl } };
}