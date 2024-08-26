import React, { useState } from "react";
import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import styles from "../Home/home.module.scss";
import Image from "next/image";
import Link from "next/link";
import p1 from "../../../public/assets/images/macparts-img/new-arrivals.webp";
import p2 from "../../../public/assets/images/macparts-img/instock.webp";
import p3 from "../../../public/assets/images/macparts-img/authentic.webp";
import p4 from "../../../public/assets/images/macparts-img/usa.webp";
import Macparts23 from "../../../public/assets/images/macparts-img/macparts3_new.webp";

export default function Looking_macparts() {
  return (
    <section className="main_macparts pdt50 pdb50">
      <Container>
        <div className="main_heading-gradiant">
          <h2>
            <b>Looking for Mac parts?</b>
          </h2>
        </div>
        <div className={styles.imageDiv}>
          <div className={styles.firstImg}>
            <Image
              src={p1}
              alt="The newest parts available"
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.secondImg}>
            <Image
              src={p2}
              alt="Always in stock"
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.thirdImg}>
            <Image
              src={p3}
              alt="Authentic Apple Parts"
              layout="responsive"
              width={130}
              height={130}
            />
          </div>

          <div className={styles.secondImg}>
            <Image
              src={p4}
              alt="U.S. Based Company"
              layout="responsive"
              height={130}
              width={190}
            />
          </div>
        </div>

        <div className={styles.macparts_full}>
          <Row className="align-items-center">
            <Col md={5}>
              <div className={styles.macparts_box} data-aos="fade-down">
                <span>Our Products</span>
                <h3>Shop Mac Parts</h3>
                <p>
                  We provide individuals and businesses (distributors and repair
                  stores) with Genuine parts and accessories in bulk.
                </p>
                <p>
                  As one of the biggest Mac Parts Wholesalers, we supply OEM
                  parts for MacBook, iMac, Mac Mini, Mac Pro.
                </p>
                <p>Customers and Quality Come First.</p>
                <Link
                  href="/mac-parts"
                  className="main_btn hvr-shutter-out-horizontal "
                >
                  View Mac Parts
                </Link>
              </div>
            </Col>

            {/* ======MAC PARTS CONTENT COLUMN END======= */}
            <Col md={7}>
              <div className={styles.macparts_img} data-aos="fade-up">
                <Image
                  src={Macparts23}
                  alt="Apple Fix Pro Mac"
                  className="img-fluid wd100"
                />
              </div>
            </Col>
            {/* ======MAC PARTS IMG COLUMN END======= */}
          </Row>
        </div>
      </Container>
    </section>
  );
}
// ========NAVBAR END======
