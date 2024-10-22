import { useGetProductsByCollectionIdQuery } from "@/appRedux/apiSlice";
import { debounce } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Default } from "react-awesome-spinners";
import { Col, Row } from "react-bootstrap";
import n1 from "../../../public/assets/images/new-mac/n1.png";
import { useRouter } from "next/router";
import LoaderComp from "../Loader/loader_comp";

export default function AllProducts({ childCategoryID }) {
  if (!childCategoryID) return;

  const divRef = useRef(null);

  const [queryArgs, setQueryArgs] = useState({
    id: childCategoryID,
    limit:10,
    cursor: 1,
  });

  const {
    data: macPartsProducts,
    isLoading,
    isFetching: showMoreLoading,
  } = useGetProductsByCollectionIdQuery(queryArgs);

  const [allProducts, setAllProducts] = useState([]);
  const [cursor, setCursor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newProducts = macPartsProducts?.data || [];
    setAllProducts((prevVal) => {
      const uniqueData = [...prevVal, ...newProducts].filter(
        (obj, index, self) => {
          return index === self.findIndex((t) => t.id === obj.id);
        }
      );
      return uniqueData;
    });

    setCursor(macPartsProducts?.cursor || "");
    setLoading(isLoading);
  }, [macPartsProducts]);

  const getProductByCollectionID = useCallback(
    async (newCursor = "") => {
      if (newCursor) {
        setQueryArgs((presVal) => ({ ...presVal, cursor: newCursor }));
      }
    },
    [childCategoryID]
  );

  const handleScroll = async () => {
    if (cursor && !loading && !showMoreLoading) {
      // if (divRef.current) {
      //   const { top, bottom } = divRef.current.getBoundingClientRect();
      //   const windowHeight = window.innerHeight;
      //   if (windowHeight >= top - 1) {
          if (cursor) {
            // console.log("Scroll product");
            getProductByCollectionID(cursor);
          }
      //   }
      // }
    }
  };

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 100);

    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [cursor, showMoreLoading]);

  //<--------------browser back button------------->
  const router = useRouter();

  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition && loading && !showMoreLoading) {
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
  }, [router.events,showMoreLoading,loading]);
  //<----------------end of code--------------------->
  // console.log(loading,showMoreLoading)
  
  // if (loading) {
  //   return <LoaderComp />;
  // }

  return (
    <Row>
      {loading ? (
        new Array(5).fill().map((val, i) => (
          <Col md={4} xs={12} className="sell-skl" key={`skel${i}`}>
            <div className="card">
              <div className="card-img skeleton"></div>
              <div className="card-body">
                <h2 className="card-title skeleton"></h2>
              </div>
            </div>
          </Col>
        ))
      ) : allProducts?.length ? (
        <>
          {allProducts?.map((prodVal, prodIndex) => {
            return (
              <Col md={6} lg={4} xl={4} key={`pro${prodVal.id}`}>
                <Link href={`/mac-parts/${prodVal.slug}?id=${prodVal.id}`}>
                  <div className="new_shopmac_pc_box">
                    <div className="new_shopmac_pc_img">
                      <div className="single_pro_heading tagspan"></div>
                      <Image
                        src={
                          prodVal?.images?.[0]?.src || "/assets/no_image.jpg"
                        }
                        alt="Apple Fix Pro Mac Img"
                        className="img-fluid"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="new_shopmacpc_content">
                      <h2>{prodVal.name}</h2>

                      <h5>${(Number(prodVal?.price) || 0).toFixed(2)}</h5>
                    </div>
                  </div>
                </Link>
                {allProducts.length - 4 === prodIndex && (
                  <div ref={divRef}></div>
                )}
              </Col>
            );
          })}
          <Row>
            <Col className="text-center">
              {showMoreLoading && (
                <Default color={"#ed6877"} className="loader" />
              )}
            </Col>
          </Row>
        </>
      ) : (
        <div className="noproduct">There are no products </div>
      )}
    </Row>
  );
}
