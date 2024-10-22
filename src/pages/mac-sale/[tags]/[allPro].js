import MacSaleProducts from "@/components/Mac-sale/mac-sale-products";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function MacProducts({ webUrl, query }) {
  //<--------------browser back button------------->
  const router = useRouter();

  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }
    const handleRouteChange = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);
  //<----------------end of code--------------------->
  return <MacSaleProducts webUrl={webUrl} query={query} />;
}

export async function getServerSideProps({ query, resolvedUrl }) {
  return { props: { webUrl: resolvedUrl, query } };
}
