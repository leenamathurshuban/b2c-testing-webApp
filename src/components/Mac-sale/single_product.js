import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

import Image from "next/image";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import d1 from "../../../public/assets/images/new-mac/delier.png";
import r1 from "../../../public/assets/images/new-mac/return.png";
import c1 from "../../../public/assets/images/new-mac/contact-special.png";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getSubTotal,
  getTotal,
  setProductTitle,
} from "../../appRedux/counterReducer";
import axios from "axios";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { NextSeo } from "next-seo";

export default function SingleproductComp({ webUrl }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state?.counter?.cart);

  const { id } = router?.query;
  const pathname = usePathname();

  const ifMacPartPage = pathname?.includes("mac-parts");

  const [product, setProduct] = useState({});
  const [productVariant, setProductVariant] = useState({});
  const [proVariant, setProVariant] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageGallary, setImageGallary] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);

  async function quantityManage(productData, total) {
    const checkcartData = cartItem?.find((e) => e?.id === productData?.id);
    if (checkcartData) {
      setProductVariant({
        ...productData,
        stock_quantity: total - checkcartData?.quantity,
      });
    } else {
      setProductVariant(productData);
    }
  }

  const getProducById = async () => {
    try {
      // const apiUrl = `/api/WP_APIs/product/${id}`;
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/custom-woo/v1/products/${id}`;
      const response = await axios.get(apiUrl);

      const productData = response?.data?.product || [];
      // const sortedPros = productData?.variations?.sort((a,b)=>Number(a.price) - Number(b.price))
      const pros = productData?.variations?.[0] || productData;
      setTotalQuantity(pros?.stock_quantity || 0);

      productData?.variations?.length
        ? setProVariant(true)
        : setProVariant(false);

      const checkcartData = cartItem?.find((e) => e?.id === pros?.id);
      if (checkcartData) {
        setProductVariant({
          ...pros,
          stock_quantity: (pros?.stock_quantity || 0) - checkcartData?.quantity,
        });
      } else {
        setProductVariant(pros);
      }

      const imageData = pros?.image
        ? [...pros.image, ...productData?.images]
        : pros?.images;

      const uniqueImageData = imageData?.filter(
        (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
      );
      const imageUrl = uniqueImageData?.map((val) => ({
        original: val?.src,
        thumbnail: val?.src,
      }));

      setImageGallary(imageUrl);
      setProduct(productData);
      dispatch(setProductTitle(productData?.title))
      setLoading(false);
    } catch (error) {
      // console.log(error.message);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    getProducById();
  }, [router.isReady]);

  const handleIncrement = () => {
    if (productVariant?.stock_quantity > quantity) {
      setQuantity((presVal) => presVal + 1);
    } else {
      toast("You have reached the product limit.", {
        icon: "⚠️",
        id: "reachedLimit",
      });
    }
  };

  const handleDecrement = () => {
    quantity > 1 ? setQuantity((presVal) => presVal - 1) : 0;
  };

  const handleChangeSelect = async (e) => {
    const selectID = e.target.value;
    const variantData = product?.variations?.find((e) => e.id == selectID);

    if (variantData) {
      if (product?.images?.length || variantData?.image) {
        const imageData = [
          ...(variantData?.image ? [...variantData?.image] : []),
          ...(product?.images || []),
        ];

        const uniqueImageData = imageData?.filter(
          (obj, index, self) => index === self?.findIndex((t) => t.id === obj.id)
        );

        const imageUrl = uniqueImageData.map((val) => ({
          original: val?.src,
          thumbnail: val?.src,
        }));

        setImageGallary(imageUrl);
      }

      setProductVariant(variantData);
      setTotalQuantity(variantData?.stock_quantity || 0);

      quantityManage(variantData, variantData?.stock_quantity || 0);

      setQuantity(1);
    }
  };

  useEffect(() => {
    quantityManage(productVariant, totalQuantity);
  }, [cartItem]);

  const skimg = {
    height: "231px",
    width: "280px",
  };

  const vg = {
    height: "25px",
    width: "80px",
    // margin: "0 0 0 10%",
  };

  const vgdel = {
    width: "250px",
    display: "inline",
  };
  const vg2 = {
    height: "21px",
    width: "180px",
    margin: "0 0 0 2%",
  };
  const tc = {
    textAlign: "center",
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const routerPath = webUrl?.split("?");
  const canonicalUrl = `https://www.applefixpros.com${routerPath?.[0]}`;

  const attributeName = productVariant?.attributes?.find(
    (e) => e.option === productVariant?.name
  );
  // console.log('product------', productVariant)
  // console.log(product?.title)
  return (
    <>
      <NextSeo
        title={product?.title}
        description="Apple Fix Pros offers a wide range of fixed-price upgrades and repairs for your Apple computers. You can drop in our office in Citrus Heights or if you are not local, you can either have us collect or send in your computer yourself. Same-day fitting is available for most computers. We fix what Apple won’t. We offer free estimates/diagnoses for all computer jobs. No Repair = No Pay."
        canonical={canonicalUrl}
        openGraph={{
          type: "website",
          url: canonicalUrl,
          title: `${product?.title}`,
          description: `Apple Fix Pros offers a wide range of fixed-price upgrades and repairs for your Apple computers. You can drop in our office in Citrus Heights or if you are not local, you can either have us collect or send in your computer yourself. Same-day fitting is available for most computers. We fix what Apple won’t. We offer free estimates/diagnoses for all computer jobs. No Repair = No Pay.`,
          images: [
            {
              url: `${imageGallary?.[0]?.original ?? ""}`,
              width: 1022,
              height: 600,
              alt: `Apple Fix Pros  | ${product?.title}`,
            },
          ],
        }}
      />

      {loading ? (
        <main>
          <Container>
            <Row>
              <Col md={6} xs={12} style={tc}>
                <div className="o-media__figure">
                  <span className="skeleton-box" style={skimg}></span>
                  <h3 className="blog-post__headline">
                    <span className="skeleton-box" style={vg}></span>
                  </h3>
                  <p style={vgdel}>
                    <span className="skeleton-box" style={vg2}></span>
                    <span className="skeleton-box" style={vg2}></span>
                  </p>
                  <p>
                    <span
                      className="skeleton-box"
                      style={{ width: "35%" }}
                    ></span>
                  </p>
                </div>
              </Col>
              <Col md={6} xs={12}>
                <div className="o-media__figure">
                  <p>
                    <span
                      className="skeleton-box"
                      style={{ width: "15%" }}
                    ></span>
                  </p>
                  <p>
                    <span
                      className="skeleton-box"
                      style={{ width: "25%" }}
                    ></span>
                  </p>
                  <p>
                    <span
                      className="skeleton-box"
                      style={{ width: "15%" }}
                    ></span>
                  </p>
                  <p>
                    <span
                      className="skeleton-box"
                      style={{ width: "25%" }}
                    ></span>
                  </p>
                  <p>
                    <span
                      className="skeleton-box"
                      style={{ width: "25%" }}
                    ></span>
                  </p>
                  <p style={vgdel}>
                    <span className="skeleton-box" style={vg2}></span>
                    <span className="skeleton-box" style={vg2}></span>
                  </p>
                  <h3>
                    <p style={vgdel}>
                      <span className="skeleton-box" style={vg2}></span>
                      <span className="skeleton-box" style={vg2}></span>
                    </p>
                  </h3>
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      ) : (
        <section className="main_single_product pdt100 pdb100">
          <div className="single_product_desktop">
            <Container>
              <div className="single_product-full">
                <Row className="justify-content-center">
                  <Col md={6} lg={4} sm={12}>
                    <div className="single_product-img_main">
                      <div className="single_pro_box">
                        <div className="single_product-img">
                          <div className="main_productG">
                            <ImageGallery
                              items={
                                imageGallary?.length
                                  ? imageGallary
                                  : [
                                    {
                                      original: "/assets/no_image.jpg",
                                    },
                                  ]
                              }
                              showNav={false}
                              showPlayButton={false}
                              lazyLoad={true}
                              showFullscreenButton={false}
                            />
                          </div>
                        </div>
                        <div className="returnbox">
                          <Row className="justify-content-center">
                            <Col md={5} sm={6} xs={6}>
                              <div
                                className="return_img"
                                style={{ cursor: "pointer" }}
                                onClick={() => router.push("/delivery")}
                              >
                                <Image
                                  src={d1}
                                  alt="Apple Fix Pro Mac Delivery Img"
                                  className="img-fluid"
                                />
                                <p>
                                  Delivery & <br />
                                  Pickup Options
                                </p>
                              </div>
                            </Col>
                            {/* =======COLUMN END==== */}

                            <Col md={5} sm={6}>
                              <div
                                className="return_img"
                                style={{ cursor: "pointer" }}
                                onClick={() => router.push("/privacy")}
                              >
                                <Image
                                  src={r1}
                                  alt="Apple Fix Pro Mac Delivery Img"
                                  className="img-fluid"
                                />
                                <p>
                                  Return <br /> Policy
                                </p>
                              </div>
                            </Col>
                            {/* =======COLUMN END==== */}
                          </Row>
                        </div>
                      </div>

                      <div className="specialist-box">
                        <Row className="justify-content-center">
                          <Col md={9}>
                            <div className="specialist-content">
                              <Image
                                src={c1}
                                alt="Apple Fix Pro Mac chat Img"
                                className="img-fluid chatimg"
                              />
                              <p>
                                Have questions about this product?
                                <Link
                                  href="/support"
                                  className="contact-special"
                                >
                                  Contact a specialist
                                </Link>
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>

                  {/* ======SINGLE PRODUCT IMG COLUMN END======= */}
                  <Col md={6} lg={5} sm={12}>
                    <div className="single_product_box">
                      <div className="single_pro_heading">
                        {Array.isArray(product?.tags) && product?.tags?.map((tag, index) => (
                          <span key={index}>{tag}</span>
                        ))}
                      </div>

                      {/* {productVariant?.sku && (
                        <div className="skudiv">
                          <label>SKU:&nbsp;</label>
                          <em>{productVariant?.sku?.split("-")[1]}</em>
                        </div>
                      )} */}

                      {productVariant?.sku && (
                        <div className="skudiv">
                          <label>SKU: </label>
                          <em>
                            {productVariant?.sku?.split("-").length > 1
                              ? productVariant?.sku?.split("-")[1]
                              : productVariant?.sku?.split("-")[0]}
                          </em>
                        </div>
                      )}

                      <h1>{product?.title}</h1>

                      {product?.variations?.length > 0 && (
                        <Form.Select
                          onChange={handleChangeSelect}
                          value={productVariant?.id}
                          className="select-option"
                        >
                          {/* {product?.variations.map((variation) => (
                            <option
                              key={variation.id}
                              value={variation.id}
                              data-width="auto"
                            >
                              {variation?.name || ""}
                            </option>
                          ))} */}
                          {Array.isArray(product?.variations) && product?.variations?.map((obj) => (
                            <option
                              key={obj?.id}
                              value={obj?.id}
                              data-width="auto"
                            >
                              {Array.isArray(obj?.attributes) && obj?.attributes?.map((item) => item?.option)?.join(', ')}
                            </option>
                          ))}
                        </Form.Select>
                      )}

                      <div className="single_para">
                        <div
                          className=""
                          dangerouslySetInnerHTML={{
                            __html: product?.description,
                          }}
                        ></div>
                      </div>
                      <div className="pricebox_m">
                        <label className="mb-2">Price</label>
                        <p className="pricebox">
                          <span>
                            ${Number(productVariant?.price || 0).toFixed(2)}
                          </span>
                          {/* <s>$363.00</s> */}
                        </p>
                      </div>

                      <div className="numberinput">
                        <div className="quantity">
                          <div className="number-button">
                            <label className="mb-2">Quantity</label>
                            <div className="input-quantity-box-full">
                              <div className="input-quantity-box">
                                <div
                                  onClick={handleDecrement}
                                  className="input-quantity decremnt"
                                >
                                  -
                                </div>
                                <h5>{quantity}</h5>
                                <div
                                  onClick={handleIncrement}
                                  className="input-quantity increment"
                                >
                                  +
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div></div>

                      <div className="product_allbtnbox">
                        <Row>
                          <Col xl={5} lg={6} md={6} xs={12} className="">
                            {productVariant?.stock_quantity > 0 ? (
                              <button
                                className="main_btn hvr-shutter-out-horizontal addtc"
                                onClick={() => {
                                  const localData =
                                    window?.localStorage?.getItem(
                                      "persist:root"
                                    );
                                  dispatch(
                                    addToCart({
                                      localData,
                                      attributeName:
                                        attributeName?.slug ?? "attributes",
                                      product: {
                                        ...product,
                                        variations: productVariant,
                                      },
                                      quantity,
                                      remaningQty:
                                        productVariant.stock_quantity -
                                        quantity,
                                      url: router.asPath,
                                      proVariant,
                                    })
                                  );
                                  dispatch(getSubTotal());
                                  dispatch(getTotal());
                                  setQuantity(1);
                                  toast.success("Added to cart!");
                                }}
                              >
                                Add to cart
                              </button>
                            ) : (
                              <button
                                className="main_btn outstock otsbtn"
                                disabled
                              >
                                Out of stock
                              </button>
                            )}
                          </Col>

                          <Col xl={4} lg={6} md={6} xs={12} className="">
                            <Link
                              href="/cart"
                              className="main_btn hvr-shutter-out-horizontal vcbtn"
                            >
                              View cart
                            </Link>
                          </Col>
                          {ifMacPartPage ? (
                            <Col xl={9} lg={12}>
                              <Link
                                href={`${process.env.NEXT_PUBLIC_B2B_BASE_URL}`}
                                className="main_btn hvr-shutter-out-horizontal swbtn"
                              >
                                Shop Wholesale Price
                              </Link>
                            </Col>
                          ) : (
                            ""
                          )}
                        </Row>
                      </div>
                    </div>
                  </Col>

                  {/* ======SINGLE PRODUCT CONTENT COLUMN END======= */}
                </Row>
              </div>
            </Container>
          </div>
          {/* =======DESKTOP VIEW END====== */}
          <Toaster />
        </section>
      )}
    </>
  );
}
