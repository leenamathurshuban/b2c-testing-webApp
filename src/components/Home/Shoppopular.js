import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import n1 from "../../../public/assets/images/new-mac/n1.png";
import Image from "next/image";
import LoaderComp from "../Loader/loader_comp";

import { useGetProductsByCollectionIdQuery } from "@/appRedux/apiSlice";

export default function Shoppopular({ loading, products }) {
  // console.log(products)
  const getLowestPrice = (newArray) => {
    if (Array.isArray(newArray) && newArray.length > 0) {
      const lowestPrice = newArray.reduce((min, product) => {
        return Number(product.price) < min ? Number(product.price) : min;
      }, Number(newArray[0]?.price));
      return lowestPrice.toFixed(2);
    } else {
      return 0;
    }
  }

  // console.log(lowestPrice)
  // console.log(products[1].tags.split(",")?true:false)
  // const {
  //   data: popularData,
  //   isLoading: popularLoading,
  //   isError: popularError,
  // } = useGetProductsByCollectionIdQuery({
  //   id: process.env.NEXT_PUBLIC_POPULAR_CATEGORY_ID,
  //   limit: 12,
  // });

  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (popularData) {
  //     setProducts(popularData.data);
  //     setLoading(popularLoading);
  //   }
  // }, [popularLoading]);

  if (loading) {
    return <LoaderComp />;
  }

  return (
    <section className="main_macparts pdt50 pdb50">
      <Container>
        <div className="main_heading-gradiant-p">
          <p className="sub_title">Welcome to Apple Fix Pros</p>
          <h1>
            <b>Shop Our Popular Products</b>
          </h1>
        </div>

        <div className="Home_product mrt50">
          <Row>
            {Array.isArray(products) && products?.map((productVal) => {
              const hasAvailableStock =
                productVal?.variations?.length > 0
                  ? productVal?.variations?.some(
                    (e) => e.stock_quantity !== null && e.stock_quantity > 0
                  )
                  : productVal?.stock_quantity !== null &&
                  productVal?.stock_quantity > 0;
              return (
                <Col md={6} lg={4} key={productVal?.id}>
                  <Link href={`/${productVal?.slug}?id=${productVal?.id}`}>
                    <div className="new_shopmac_pc_box">
                      {!hasAvailableStock && <span className="img-sold"></span>}
                      <div className="single_pro_heading tagspan">
                        {/* {productVal?.tags?.map((tag, i) => (
                          <span key={i}>{tag.name}</span>
                        ))} */}
                        {/* {Array.isArray(productVal?.tags) ?
                          productVal?.tags?.map((tag, i) => (
                            <span key={i}>{tag?.name}</span>
                          )) : productVal?.tags?.split(",")?.map((val, i) => (
                            <span key={i}>{val}</span>
                          ))
                        } */}
                        {Array.isArray(productVal?.tags) && productVal?.tags?.map((tag, i) => (<span key={i}>{tag?.name}</span>))}
                        {!productVal?.tags ? "" : productVal?.tags?.split(",").map((val, i) => (<span key={i}>{val}</span>))}
                      </div>
                      <div className="new_shopmac_pc_img">
                        <Image
                          src={
                            // productVal?.images?.[0]?.src ||
                            productVal?.image || "/assets/no_image.jpg"
                          }
                          alt="Apple Fix Pro Mac Img"
                          className="img-fluid"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="new_shopmacpc_content">
                        <h2>{productVal?.name}</h2>
                        {/* <p>{productVal.description}</p> */}
                        <h5>
                          {/* From ${(Number(productVal?.price) || 0).toFixed(2)} */}
                          {/* From ${Array.isArray(productVal?.variations) && productVal?.variations?.length > 0 ?
                            getLowestPrice(productVal?.variations)
                            : (Number(productVal?.price) || 0).toFixed(2)} */}
                          From ${productVal?.price != "" ? (Number(productVal?.price)).toFixed(2)
                            : getLowestPrice(productVal?.variations)}
                        </h5>
                        <Link
                          className={
                            hasAvailableStock
                              ? "main_btn hvr-shutter-out-horizontal"
                              : "main_btn hvr-shutter-out-horizontal btn-disabled"
                          }
                          href={`/${productVal?.slug}?id=${productVal?.id}`}
                        >
                          {hasAvailableStock ? "View Product" : "Out of Stock"}
                        </Link>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </div>

        <div className="shopbox-btn text-center">
          <Link
            className="main_btn hvr-shutter-out-horizontal"
            href="/mac-sale"
          >
            Shop All
          </Link>
        </div>
      </Container>
    </section>
  );
}
