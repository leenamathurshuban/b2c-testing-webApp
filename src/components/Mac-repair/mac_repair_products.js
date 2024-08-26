import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Image from "next/image";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Error from "next/error";
import { NextSeo } from 'next-seo';

import data from "./data.json";
import MacRepairSkeleton from "./mac_repair_skeleton";

export default function MacproductsRepairComp({ webUrl }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);

  // const [ smShow, setSmShow ] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [allproducts, setAllProducts] = useState([]);
  const [allproductsWithoutLimit, setAllProductsWithoutLimit] = useState([]);

  // const [ productDetails, setProductDetails ] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imagesIndex, setimagesIndex] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [currentTag, setCurrentTag] = useState("");

  var router = useRouter();

  var tags = "";

  useEffect(() => {
    if (!router.isReady) return;

    tags = router.query["tags"];
    var id = router.query["id"];
    setCurrentTag(tags);
    setAllProducts([]);
    getAllProductsApi();
  }, [router.isReady]);

  const pageData = {
    imac: {
      title: "iMac Repair Near Me | Get Your iMac Fixed Today!",
      description:
        "We offer fast and affordable iMac repair near you. Our certified technicians can fix all types of iMac problems, including screen repair, hardware repair, and software repair. We offer same-day repair on most models.",
      imgUrl:
        "https://www.applefixpros.com/images/mac-repair/Imac/imac_21_4k_2017.jpg",
    },
    "imac-pro": {
      title:
        "iMac Pro Repair Near Me | Apple Certified Technicians | Same Day Repair",
      description:
        "Get your iMac Pro screen repaired quickly and affordably by our team of certified technicians. We offer same-day repair and a free diagnostic on all repairs.",
      imgUrl:
        "https://www.applefixpros.com/images/mac-repair/Imac-pro/imac_pro_27_2017.jpg",
    },
    "mac-pro": {
      title:
        "Apple Mac Pro Repair Near Me | Mac Pro Repair Experts | Fast & Affordable",
      description:
        "We are your trusted Apple Mac Pro repair experts. We offer fast, affordable, and reliable repair services for all Mac Pro models. Get your Mac Pro repaired today by our team of certified technicians.",
      imgUrl:
        "https://www.applefixpros.com/images/mac-repair/Mac-pro/mac_pro_2019.jpg",
    },
    "mac-mini": {
      title:
        "Apple Mac Mini Repair Near Me | Mac Mini Repair Experts | Fast & Affordable",
      description:
        "We are your trusted Apple Mac mini repair experts. We offer fast, affordable, and reliable repair services for all Mac mini models. Get your Mac mini repaired today by our team of certified technicians.",
      imgUrl:
        "https://www.applefixpros.com/images/mac-repair/Mac-mini/mac_mini.jpg",
    },
    macbook: {
      title: "Apple MacBook Repair Shop Near You",
      description:
        "Get your MacBook repaired quickly and affordably by experienced technicians at Apple Fix Pro, the best MacBook repair shop near you. We specialize in all types of MacBook repairs, including screen repairs, logic board repairs, and water damage restoration. Get a free quote today!",
      imgUrl:
        "https://www.applefixpros.com/images/mac-repair/Macbook/macbook_12_2017.jpg",
    },
    "macbook-air": {
      title: "Apple MacBook Air Screen Water Damage Repair Near You",
      description:
        "Get your MacBook Air repaired quickly and affordably by experienced technicians at Apple Fix Pro, the best MacBook Air repair shop near you. We specialize in all types of MacBook Air repairs, including screen repairs, logic board repairs, and water damage restoration. Get a free quote today!",
      imgUrl:
        "https://www.applefixpros.com/images/mac-repair/Macbook_air/macbook_air_11_early_2014.jpg",
    },
    "macbook-pro": {
      title: "Apple MacBook Pro Screen Water Damage Repair Near You",
      description:
        "Get your Apple MacBook Pro screen repaired quickly and affordably at a shop near you. We specialize in water damage repair, and we can get your Mac back to new in no time.",
      imgUrl:
        "https://www.applefixpros.com/images/mac-repair/macbook_pro/macbook_pro_13_2tbt3_2016.jpg",
    },
  };

  const seoData = pageData[currentTag] || {};

  const getAllProductsApi = async (lastIndexId = "") => {
    const getAll = data;

    const tagData = getAll.data[tags];
    setAllProductsWithoutLimit(tagData);
    setAllProducts(tagData);
    if (lastIndexId != "") {
    }

    setIsLoading(false);
    setIsLoadingLoadMore(false);
  };

  const myLoader = ({ src, width, quality }) => {
    return `${src}&w=${width}&q=${quality || 75}`;
  };

  return allproducts === undefined ? (
    <Error statusCode={404} />
  ) : (
    <>
      <NextSeo
				title={seoData.title}
				description={seoData.description}
				canonical={`https://www.applefixpros.com${webUrl}`}
				openGraph={{
					type: 'website',
					title: `${seoData.title}`,
					description: `${seoData.description}`,
					url:`https://www.applefixpros.com${webUrl}`,
					images: [
						{
							url: `${seoData.imgUrl}`,
							width: 1022,
							height: 600,
							alt: `Apple Fix Pros  | ${currentTag}`,
						},
					],
				}}
			/>
      <section
        className={
          isLoading
            ? "main_shopmac new_mac_section d-none"
            : "main_shopmac new_mac_section"
        }
      >
        <div className="shopmac_desktop macrepair_desktop">
          <Container>
            <div className="main_heading-gradiant-p">
              <h1>
                Mac <b>Repair</b>
              </h1>
              <p>
                Apple Fix Pros will repair your MacBook Air, MacBook Pro, iMac
                and Mac Mini products.
              </p>
            </div>

            <div className="shopmac-full mrt50">
              <Row
                className={
                  allproducts && Object.keys(allproducts).length <= 0
                    ? ""
                    : "d-none"
                }
              >
                <div className="no-data">
                  <h4 className="text-center">No Product Available!</h4>
                </div>
              </Row>
              <Row
                className={
                  allproducts && Object.keys(allproducts).length > 0
                    ? ""
                    : "d-none"
                }
              >
                {allproducts &&
                  Object.keys(allproducts).map((index) => (
                    <>
                      <h2 className="pb-3" key={"repair" + index}>
                        {index}
                      </h2>
                      {allproducts[index].map((val, key) => {
                        return (
                          <Col
                            md={4}
                            lg={4}
                            key={"repairnew" + key}
                            data-aos="fade-down"
                          >
                            {/* <Link href={`/mac-products-details/${val.id}`} > */}
                            <Link
                              href={`/mac-repair/${encodeURIComponent(
                                currentTag
                              )}/${encodeURIComponent(val.handle)}`}
                            >
                              <div className="rcshopmac_box repair-img-box">
                                <div className="shopmac_img">
                                  <Image
                                    className="img-fluid backgroundLoder"
                                    src={val.image}
                                    alt="Apple Fix Pro Shop"
                                    // loader={myLoader}
                                    width={50}
                                    height={50}
                                  />
                                </div>
                                <div className="shopmac_content">
                                  <h2>{val.title}</h2>
                                  <p>{val.description}</p>
                                </div>
                              </div>
                            </Link>
                          </Col>
                        );
                      })}
                    </>
                  ))}
              </Row>
            </div>
          </Container>
        </div>
        {/* =========SHOPMAC DESKTOP VIEW END======== */}
      </section>

      {/* =======MODEL START ========= */}
      <div>
        {isOpen && (
          <Lightbox
            imageLoadErrorMessage="This image failed to load"
            // imageTitle={productImages[imagesIndex].name}
            mainSrc={productImages[imagesIndex]}
            nextSrc={productImages[(photoIndex + 1) % productImages.length]}
            prevSrc={
              productImages[
                (photoIndex + productImages.length - 1) % productImages.length
              ]
            }
            onCloseRequest={() => {
              setLgShow(true);
              setIsOpen(false);
              setimagesIndex(null);
            }}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + productImages.length - 1) % productImages.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % productImages.length)
            }
          />
        )}
      </div>
      {/* ========MODEL END======== */}
      <main className={isLoading ? "" : "d-none"}>
        <Container>
          <Row>
            <MacRepairSkeleton />
            {/* =====column end=== */}
            <MacRepairSkeleton />
            {/* =====column end=== */}
            <MacRepairSkeleton />
            {/* =====column end=== */}
            <MacRepairSkeleton />
            {/* =====column end=== */}
            <MacRepairSkeleton />
            {/* =====column end=== */}
            <MacRepairSkeleton />
            {/* =====column end=== */}
            <MacRepairSkeleton />
            {/* =====column end=== */}
          </Row>
        </Container>
      </main>
    </>
  );
}
// ====SHOP OUR MAC SECTION END=====
