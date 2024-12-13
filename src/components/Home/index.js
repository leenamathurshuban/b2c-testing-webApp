import { useEffect, useRef, useState } from "react";
import Looking_macparts from "./Looking_macparts";
import Shoppopular from "./Shoppopular";
import BuyrepairComp from "./buysellandrepair";
import TrustedComp from "./trusted";
import { useRouter } from "next/router";
import { Shoppopularpart } from "./Shoppopularpart";
import { useGetPopularProductsPartsQuery } from "@/appRedux/apiSlice";
import CountdownTimer from "./CountdownTimer";
import Link from "next/link";
// import FlowerApp from "../FlowerApp";
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
      Array.isArray(popularData) && popularData?.map((val) => {
        val.category == "Products" ? setProducts(val?.data) : setParts(val?.data)
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
      setTimeout(() => {
        sessionStorage.removeItem("scrollPosition")
      }, 1000)
    }
    const handleRouteChange = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);
  //<----------------end of code back--------------------->
  // useEffect(() => {
  //   // Check if the page was refreshed
  //   const isPageRefreshed = performance.getEntriesByType('navigation')[0].type === 'reload';

  //   if (isPageRefreshed) {
  //     console.log('Page was refreshed');
  //     sessionStorage.removeItem('scrollPosition')
  //     // Handle the refresh event here
  //   }
  // }, [router.events]);
  useEffect(() => {
    setTimeout(()=>{
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },100)    
  }, [router.events]);

  console.log('order_data',router.query)

  return (
    <>
      <Shoppopular loading={loading} products={products} />
      {/* <section className="countdown_aria">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-12 countdown_info">
                <h4>Get <span>15% off</span> now</h4>
                <h2>Sales end in </h2>                
                <CountdownTimer />
                <Link href="#shop-now" className="main_btn hvr-shutter-out-horizontal">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Shoppopularpart loading={loading} parts={parts} />
      <BuyrepairComp />
      <Looking_macparts />
      <TrustedComp />
    </>
  );
}
