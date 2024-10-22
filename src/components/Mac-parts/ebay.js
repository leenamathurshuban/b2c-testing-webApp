import React from "react";
import Link from "next/link";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import ptm4 from "../../../public/assets/images/macparts-img/ebay.jpg";
import wholesaleimg from "../../../public/assets/images/macparts-img/wholesaleimg.jpg";
import Image from "next/image";
export default function EbayComp() {
  return (
    <section className="main_trusted wholesale_section ebay-section mrt100 mrb100">
      <Container>
        <div className="trusted-full" data-aos="fade-down">
          <Row className="justify-content-center">
            <Col md={6} lg={4}>
              <div className="wholesale_left">
                <h2>More Parts?</h2>
                <p>
                  Please visit our eBay store or call our Mac Parts Department.
                </p>
                
              </div>
            </Col>
            {/* ======WHOLESALE CONTENT COLUMN END======= */}
            <Col md={6} lg={4}>
              <div className="checkbox-img">
                <Link
                  href="https://www.ebay.com/str/applefixpros"
                  target="_blank"
                >
                  <Image
                    src={ptm4}
                    // src={CheckImage}
                    alt="Apple Fix Pro Check Img"
                    priority={true}
                    className="img-fluid wd100"
                    width={500}
                    height={200}
                  />
                </Link>
              </div>
            </Col>
            {/* ======WHOLESALE FORM COLUMN END======= */}
          </Row>
          <Row className="justify-content-center">
            <Col md={12} lg={12}>
              {/* <div className="wholesale-img">
                <Link href="https://business.applefixpros.com/">
                  <Image
                    src={wholesaleimg}
                    alt="Apple Fix Pro Check Img"
                    priority={true}
                    className="img-fluid wd100"
                    width={150}
                    height={150}
                  />
                </Link>
              </div> */}
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}
// =======SECTION END========
