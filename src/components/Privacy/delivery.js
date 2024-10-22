import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function MacprivacyComp() {
  return (
    <section className="main_macprivacy mrt50">
      <Container>
        <div className="privacy-box">
          <Row className="justify-content-center">
            <Col md={10} lg={10}>
              <div className="main_heading-gradiant-p">
                <h1>
                  <b>Delivery & Shipping</b>
                </h1>
              </div>

              <div className="privacy-box-ul mrt50">
                <h2>Same Day Pickup</h2>
                <p>
                  Need a Mac same day? We offer same day pick up on all units
                  and parts. You can call us or simply order online and bring
                  your receipt to our office
                </p>
                {/* <p>6831 Greenback Lane, Citrus Heights, CA 9562.</p> */}
                <p>500 Cirby Way, Suite D, Roseville, CA 95678</p>
                <p>
                  To initiate a pickup: Please make sure your order is replaced
                  before 2 PM. All units and products require 2-3 hours window
                  for preparation and quality check.
                </p>
              </div>
              <div className="privacy-box-ul mrt50">
                <h2>Shipping</h2>
                <p>
                  We offer expedited and 2 days shipping on all units and parts.
                  You can call us or just simply make a purchase online.
                </p>
                <p>
                  We partner with USPS and UPS. They provide us an excellent
                  service when it comes to pick up or drop off.
                </p>
              </div>
              <div className="privacy-box-ul mrt50">
                <h2>Delivery</h2>
                <p>
                  Soon we will be offering free delivery within 25 miles of
                  95678 Zip Code. This service will be offered with no extra
                  charge.
                </p>
                <p>
                  This service will be exclusive for businesses and service
                  providers.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}
