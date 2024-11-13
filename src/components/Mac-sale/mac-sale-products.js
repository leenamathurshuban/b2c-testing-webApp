import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import n1 from "../../../public/assets/images/new-mac/n1.png";
import { Default } from "react-awesome-spinners";
import { NextSeo } from "next-seo";
import { MultiSelect } from "react-multi-select-component";
import { debounce } from "@/lib/helpers";
import {
  useGetMacSalesProductsByIDQuery,
  useGetProductsByCollectionIdQuery,
} from "@/appRedux/apiSlice";
import MacsalepageComp from "./Macsalepage";

const labelConfig = {
  selectSomeItems: "Filter",
  allItemsAreSelected: "All options selected",
  selectAll: "Select all options",
  search: "Search",
  clearSearch: "Clear search",
};

export default function MacSaleProducts({ webUrl, query }) {
  const { tags, id, allPro } = query;
  const divRef = useRef(null);

  const [queryArgs, setQueryArgs] = useState({ id, limit: 10, cursor: 1 });

  const {
    data: macSaleProducts,
    isLoading: macSaleLoading,
    isError: macSaleError,
    isFetching: showMoreLoading,
  } = useGetProductsByCollectionIdQuery(queryArgs);

  // States
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cursor, setCursor] = useState("");
  const [filterCursor, setFilterCursor] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMoreFilterLoading, setShowMoreFilterLoading] = useState(false);

  const [selectVal, setSelectVal] = useState([]);
  const [multiSelectOption, setMultiSelectOption] = useState([]);

  // Helper functions
  const filterProductData = async (val, clickVal = "") => {
    try {
      clickVal === "showMore"
        ? setShowMoreFilterLoading(true)
        : setLoading(true);

      const selectionID = val?.[0]?.label ? val.map((e) => e.value) : val;

      const filterData = await axios.post("/api/productFilter", {
        categoryID: id,
        selectionID,
        filterCursor,
      });

      const { items, cursor } = filterData.data;

      const updatedProducts = val?.[0]?.label
        ? Array.from(new Set([...products, ...items]))
        : items;

      setProducts(updatedProducts);
      setFilterCursor(cursor);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setShowMoreFilterLoading(false);
    }
  };

  const optimizedFn = useCallback(debounce(filterProductData), []);

  const handleChangeMultiSelect = (val) => {
    setSelectVal(val);
    if (val.length) {
      const selectionID = val.map((e) => e.value);
      optimizedFn(selectionID);
    } else {
      setProducts(allProducts);
    }
  };

  const getProductByCollectionID = useCallback(
    async (newCursor = "") => {
      if (newCursor) {
        setQueryArgs((presVal) => ({ ...presVal, id, cursor: newCursor }));
      }
    },
    [id]
  );

  useEffect(() => {
    setCurrentTag(tags);
    const newProducts = macSaleProducts?.data || [];
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setAllProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setCursor(macSaleProducts?.cursor || "");

    if (!macSaleLoading) {
      setLoading(false);
    }
  }, [macSaleProducts, macSaleLoading]);

  useEffect(() => {
    getProductByCollectionID();
  }, [getProductByCollectionID]);

  const handleScroll = async () => {
    if (cursor && !loading && !showMoreLoading) {
      // if (divRef.current) {
      //   const { top, bottom } = divRef.current.getBoundingClientRect();
      //   const windowHeight = window.innerHeight;
      //   if (windowHeight >= top - 1) {
      if (cursor) {
        // console.log("Scroll product");
        getProductByCollectionID(cursor);
      } else if (selectVal.length !== 0 && filterCursor) {
        // console.log("Scroll filter");
        filterProductData(selectVal, "showMore");
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
  }, [cursor, loading, showMoreLoading, id, selectVal, filterCursor]);

  const routerPath = webUrl?.split("?");
  const canonicalUrl = `https://www.applefixpros.com${routerPath?.[0]}`;
  console.log(allProducts)

  return (
    <>
      <NextSeo
        title={currentTag}
        description="Apple Fix Pros offers a wide range of fixed-price upgrades and repairs for your Apple computers. You can drop in our office in Citrus Heights or if you are not local, you can either have us collect or send in your computer yourself. Same-day fitting is available for most computers. We fix what Apple won’t. We offer free estimates/diagnoses for all computer jobs. No Repair = No Pay."
        canonical={canonicalUrl}
        openGraph={{
          type: "website",
          url: canonicalUrl,
          title: `${currentTag}`,
          description: `Apple Fix Pros offers a wide range of fixed-price upgrades and repairs for your Apple computers. You can drop in our office in Citrus Heights or if you are not local, you can either have us collect or send in your computer yourself. Same-day fitting is available for most computers. We fix what Apple won’t. We offer free estimates/diagnoses for all computer jobs. No Repair = No Pay.`,
          images: [
            {
              // url: `${allproducts?.[0]?.image?.src ?? ''}`,
              width: 1022,
              height: 600,
              alt: `Apple Fix Pros  | ${currentTag}`,
            },
          ],
        }}
      />

      <section className="main_shopmac new_mac_section">
        <div className="shopmac_desktop_new">
          <Container>
            <div className="main_heading-gradiant-p">
              <h1>
                Looking for a <b>New Mac?</b>
              </h1>
              {/* <p>
                Apple Fix Pros will repair your MacBook Air, MacBook Pro, iMac
                and Mac Mini products.
              </p> */}
            </div>

            {/* {allProducts?.length > 0 && (
              <MultiSelect
                className='service-small'
                options={multiSelectOption}
                value={selectVal}
                onChange={handleChangeMultiSelect}
                hasSelectAll={false}
                labelledBy='Filter'
                overrideStrings={labelConfig}
              />
            )} */}
            <div className="macsalerpro_row">
              <Row className="justify-content-start">
                {loading === true ? (
                  new Array(5).fill().map((val, i) => (
                    <Col md={4} xs={12} className="sell-skl" key={`skel${i}`}>
                      <div className="card">
                        <div className="card-img skeleton"></div>
                        <div className="card-body">
                          <h2 className="card-title skeleton"></h2>
                          <h2 className="card-title skeleton"></h2>
                          <h2 className="card-title skeleton"></h2>
                        </div>
                      </div>
                    </Col>
                  ))
                ) : products?.length ? (
                  <>
                    {products?.map((productVal, index) => {
                      const hasAvailableStock =
                        productVal.variations.length > 0
                          ? productVal.variations.some(
                              (e) =>
                                e.stock_quantity !== null &&
                                e.stock_quantity > 0
                            )
                          : productVal.stock_quantity !== null &&
                            productVal.stock_quantity > 0;

                      return (
                        <Col
                          xl={4}
                          lg={4}
                          md={6}
                          sm={12}
                          key={`products${index}`}
                        >
                          <Link
                            href={`/mac-sale/${tags}/${allPro}/${productVal.slug}?id=${productVal.id}`}
                          >
                            <div className="new_shopmac_pc_box">
                              <div className="single_pro_heading tagspan">
                                {productVal?.tags?.map((tag, tagIndex) => (
                                  <span key={tagIndex}>{tag.name}</span>
                                ))}
                              </div>
                              <div className="new_shopmac_pc_img">
                                {!hasAvailableStock && (
                                  <span className="img-sold"></span>
                                )}
                                <Image
                                  src={
                                    productVal?.images?.[0]?.src ||
                                    "/assets/no_image.jpg"
                                  }
                                  alt="Apple Fix Pro Mac Img"
                                  className="img-fluid"
                                  width={100}
                                  height={100}
                                  loading="lazy"
                                />
                              </div>
                              <div className="new_shopmacpc_content">
                                <h2>{productVal.name}</h2>
                                {/* <p>
																		{
																			productVal
																				.item_data
																				.description
																		}
																	</p> */}
                                <h5>
                                  From $
                                  {Number(productVal.price || 0).toFixed(2)}
                                </h5>

                                <Link
                                  className={
                                    hasAvailableStock
                                      ? "main_btn hvr-shutter-out-horizontal"
                                      : "main_btn hvr-shutter-out-horizontal btn-disabled"
                                  }
                                  href={`/mac-sale/${tags}/${allPro}/${productVal.slug}?id=${productVal.id}`}
                                >
                                  {hasAvailableStock
                                    ? "View Product"
                                    : "Out of Stock"}
                                </Link>
                              </div>
                            </div>
                          </Link>
                          {products.length - 4 === index && (
                            <div ref={divRef}></div>
                          )}
                        </Col>
                      );
                    })}
                    {selectVal.length === 0 && cursor && (
                      <Row>
                        <Col className="text-center">
                          {showMoreLoading && (
                            <Default color={"#ed6877"} className="loader" />
                            // ) : (
                            //   <button
                            //     className='main_btn hvr-shutter-out-horizontal'
                            //     onClick={() => getProductByCollectionID(cursor)}
                            //   >
                            //     Show more
                            //   </button>
                          )}
                        </Col>
                      </Row>
                    )}

                    {selectVal.length !== 0 && filterCursor && (
                      <Row>
                        <Col className="text-center">
                          {showMoreFilterLoading && (
                            <Default color={"#ed6877"} className="loader" />
                            // ) : (
                            //   <button
                            //     className='main_btn hvr-shutter-out-horizontal'
                            //     onClick={() =>
                            //       filterProductData(selectVal, "showMore")
                            //     }
                            //   >
                            //     Show more
                            //   </button>
                          )}
                        </Col>
                      </Row>
                    )}
                  </>
                ) : (
                  <div className="noproduct">There are no products </div>
                )}
              </Row>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
