import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  cartBlank,
  cartDecrement,
  cartIncrement,
  getSubTotal,
  getTotal,
  removeToCart,
  updateCartStock,
} from "@/appRedux/counterReducer";
import axios from "axios";
import { useRouter } from "next/router";
import LoaderComp from "../Loader/loader_comp";
import toast, { Toaster } from "react-hot-toast";

export default function MaccartComp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    cart: cartItems,
    subTotal,
    totalAmount,
  } = useSelector((state) => state.counter);

  const [loading, setLoading] = useState(true);

  // useEffect(()=>{
  //   try {

  //   } catch (error) {
  //     console.log (`Error fetching data: ${error}`);
  //   }
  // },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const qtyData = await Promise.all(
        //   cartItems?.map(async (element) => {
        //     const res = await axios.get(`/api/variationQuantity/${element.id}`);
        //     return {
        //       id: element.id,
        //       name: element.name,
        //       productID: element.productID,
        //       productName: element.productName,
        //       price: element.price,
        //       image_url: element.image_url,
        //       quantity:
        //         element.quantity > res.data ? res.data : element.quantity,
        //       remaningQty: res.data - element.quantity,
        //       url: element.url,
        //     };
        //   })
        // );
        // dispatch(updateCartStock({ qtyData }));
        // await axios.post(`/api/WP_APIs/createUser`);
        // await axios.get(`/api/WP_APIs/clearCart`);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createCheckout = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/WP_APIs/AddToCart", {
        lineItems: cartItems,
      });

      if (response?.data) {
        router.push(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkout?add-to-cart=${response.data?.data}&clear-cart=true`
        );
        // dispatch(cartBlank());
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <LoaderComp /> : ""}

      <section className="main_macparts_cart pdt100 pdb100">
        {cartItems?.length ? (
          <Container>
            <div className="cat-page-heading">
              <Row>
                <Col md={12}>
                  <h1>Shopping Cart</h1>
                </Col>
              </Row>
            </div>

            <div className="cart-detail-main">
              <Row className="carttable">
                <Col md={12}>
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th className="product-thumbnail">&nbsp;</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Subtotal</th>
                        <th className="product-remove">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((val, index) => {
                        return (
                          <tr className="cart_item" key={index}>
                            <td className="product-thumbnail">
                              <Link href={val.url} className=" ">
                                <Image
                                  src={val?.image_url || "/assets/no_image.jpg"}
                                  alt="Apple Fix Pro Mac Img"
                                  className="img-fluid"
                                  width={100}
                                  height={100}
                                />
                              </Link>
                            </td>

                            <td className="product-name" data-title="Product">
                              {val.productName}{" "}
                              {`(${val.proVariant ? val.name : "Regular"})`}
                            </td>

                            <td className="product-price" data-title="Price">
                              <span className="Price-amount">
                                <bdi>
                                  <span className="Price-currencySymbol">
                                    $
                                  </span>
                                  {val.price}
                                </bdi>
                              </span>
                            </td>

                            <td
                              className="product-quantity"
                              data-title="Quantity"
                            >
                              <div className="quantity">
                                <div className="number-button">
                                  {/* <Form.Label className='screen-reader-text'>
                                      {val.quantity}
                                    </Form.Label> */}
                                  <div className="input-quantity-box-full">
                                    <div className="input-quantity-box input-quantity-box-cart">
                                      <div
                                        onClick={() => {
                                          dispatch(
                                            cartDecrement({
                                              id: val.id,
                                              productID: val.productID,
                                            })
                                          );
                                          dispatch(getSubTotal());
                                          dispatch(getTotal());
                                        }}
                                        className="input-quantity decremnt"
                                      >
                                        -
                                      </div>
                                      <h5>{val.quantity}</h5>
                                      <div
                                        onClick={() => {
                                          dispatch(
                                            cartIncrement({
                                              id: val.id,
                                              productID: val.productID,
                                            })
                                          );
                                          dispatch(getSubTotal());
                                          dispatch(getTotal());
                                        }}
                                        className="input-quantity increment"
                                      >
                                        +
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td
                              className="product-subtotal"
                              data-title="Subtotal"
                            >
                              <span className="Price-amount">
                                <bdi>
                                  <span className="Price-currencySymbol">
                                    $
                                  </span>
                                  {val.price
                                    ? (val.price * val.quantity).toFixed(2)
                                    : ""}
                                </bdi>
                              </span>
                            </td>

                            <td className="product-remove">
                              <span
                                type="button"
                                onClick={() => {
                                  dispatch(
                                    removeToCart({
                                      id: val.id,
                                      productID: val.productID,
                                      productQuantity: val.quantity,
                                    })
                                  );
                                  dispatch(getSubTotal());
                                  dispatch(getTotal());
                                  toast.success("Item removed.");
                                }}
                                className="remove"
                                aria-label="Remove this item"
                              >
                                <FaTimes />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>

              <div className="subtotlrow">
                <Row className="justify-content-between">
                  <Col md={4}>
                    <div className="cnbtn_box">
                      <div className="process-btn">
                        <Link
                          href="/"
                          className="main_btn hvr-shutter-out-horizontal "
                        >
                          Continue Shopping{" "}
                        </Link>{" "}
                      </div>{" "}
                    </div>{" "}
                  </Col>

                  {/* ====COLUMN END= */}
                  <Col md={4}>
                    <div className="totalcheck">
                      <Table bordered responsive>
                        <thead>
                          <tr>
                            <th colSpan={2}>Cart Totals</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Subtotal</td>
                            <td>${subTotal}</td>
                          </tr>

                          <tr>
                            <td>Shipping</td>
                            <td>Shipping calculated checkout page</td>
                          </tr>

                          <tr>
                            <td className="total-c">Total</td>
                            <td className="total-c">${totalAmount}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <div className="process-btn">
                        <button
                          className="main_btn hvr-shutter-out-horizontal"
                          onClick={createCheckout}
                        >
                          Proceed to checkout
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        ) : (
          <div className="cartempty">
            <Row className="justify-content-center">
              <Col md={4}>
                <div className="cartempty_box">
                  <h5>Your cart is empty!</h5>
                  <Link
                    href="/"
                    className="main_btn hvr-shutter-out-horizontal "
                  >
                    Continue Shopping
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        )}
        <Toaster />
      </section>
    </>
  );
}
