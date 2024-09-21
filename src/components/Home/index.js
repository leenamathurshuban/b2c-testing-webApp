import { useEffect, useState } from "react";
import Looking_macparts from "./Looking_macparts";
import Shoppopular from "./Shoppopular";
import BuyrepairComp from "./buysellandrepair";
import TrustedComp from "./trusted";
import { useRouter } from "next/router";
import { Shoppopularpart } from "./Shoppopularpart";
import { useGetPopularProductsPartsQuery } from "@/appRedux/apiSlice";

export default function HomeComp() {

  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularError,
  } = useGetPopularProductsPartsQuery();

  const [products, setProducts] = useState([]);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (popularData) {
      popularData.map((val)=>{
        val.category == "Products"?setProducts(val.data):setParts(val.data)
      })
      setLoading(popularLoading)
    }
  }, [popularLoading]);

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

  return (
    <>
      <Shoppopular loading={loading} products={products} />
      <Shoppopularpart loading={loading} parts={parts} />
      <BuyrepairComp />
      <Looking_macparts />
      <TrustedComp />
    </>
  );
}
