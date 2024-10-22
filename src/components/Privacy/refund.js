import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
// import TestiComp from "../Testimonial";

export default function MacRefundComp() {
  return (
    <section className="main_maclegal mrt50">
      <Container>
        <div className="privacy-box">
          <Row className="justify-content-center">
            <Col md={10} lg={10}>
              <div className="main_heading-gradiant-p">
                <h1>
                  <b>Returns & Refunds</b>
                </h1>
              </div>

              <div className="privacy-box-ul mrt50">
                <p>
                  AFP wants you to be thrilled with your purchase. However, if
                  you need to return an item, we're here to help.
                </p>
                <h2>Returns & Refunds Policy </h2>
                <h3>Standard Return Policy</h3>
                <p>
                  There are a few important things to keep in mind when
                  returning a product, you purchased online from us.
                </p>

                <ul>
                  <li>
                    You have 7 calendar days to return an item from the date you
                    received it.
                  </li>
                  <li>
                    Only items that have been purchased directly from our store,
                    either online or at a Retail Store, can be returned.
                  </li>
                  <li>
                    Please ensure that the item you're returning is repackaged
                    with all the cords, adapters and documentation that were
                    included when you received it.
                  </li>
                </ul>
              </div>
              <div className="privacy-box-ul">
                <h3>Bring your item to our store or ship it. </h3>
                <ul>
                  <li>
                    Your refund will be processed after inspection from any
                    Physical or iCloud status,
                  </li>
                </ul>
              </div>

              <div className="privacy-box-ul">
                <h2> Refunds </h2>
                <p>
                  If you paid by credit or debit card, refunds will be sent to
                  the card-issuing bank within five business days of receipt of
                  the returned item or cancellation request. Please contact the
                  card-issuing bank with questions about when the credit will be
                  posted to your account.
                </p>
                <p>
                  Products paid for using your Apple Account Balance will be
                  refunded to your Apple Account Balance.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      {/* <TestiComp /> */}
    </section>
  );
}
