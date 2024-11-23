import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../Home/home.module.scss";
import Image from "next/image";
import thanksfoot_vctr from "../../../public/images/footer/thanksgiving_footvactor.png";
export default function TrustedComp() {
  return (
    <section className="main_trusted">
      <Container>
        <div className={styles.trusted_full} data-aos="fade-down">
          <Row className="">
            <Col md={7}>
              <div className={`${styles.trusted_box_left} `}>
                <h5>
                  We are trusted <br />
                  by thousands
                </h5>
                <p>
                  Our staff members are Apple Certified Technicians, CompTIA A+
                  Certified Specialists. This ensures that we are up-to-date on
                  all hardware and software issues that you may encounter.
                </p>
                <p>
                  Because we are open 6 days a week, we give you the flexibility
                  of coming into our store when you're available. Depending on
                  the issues, Apple Fix Pros' certified technicians can provide
                  same day solutions.
                </p>
              </div>
              <div className="fox_vactor">
                <Image src={thanksfoot_vctr} alt="Apple Fix Pro" className="img-fluid" />
              </div>
            </Col>
            {/* ======TRUSTED CONTENT COLUMN END======= */}
            <Col md={5}>
              <div className={styles.trusted_box_right}>
                <div className={styles.trusted_right_box}>
                  <div className={styles.trasted_vlue}>
                    <h6>5.0</h6>
                  </div>
                  <div className={styles.trasted_vluenum}>
                    <h5>Highly Reviewed</h5>
                    <p>
                      We come highly recommended. Our 5 stars reviews are all
                      over Yelp and Google and eBay show how we put our
                      customers satisfaction first.
                    </p>
                  </div>
                </div>

                {/* ======NUMBER BOX_END====== */}

                <div className={styles.trusted_right_box}>
                  <div className={styles.trasted_vlue}>
                    <h6>29K+</h6>
                  </div>
                  <div className={styles.trasted_vluenum}>
                    <h5>Customers Helped</h5>
                    <p>
                      We served more than 29000 customers since 2019. We do same
                      day repairs with no appointments required.
                    </p>
                  </div>
                </div>

                <div className={styles.trusted_right_box}>
                  <div className={styles.trasted_vlue}>
                    <h6>7K+</h6>
                  </div>
                  <div className={styles.trasted_vluenum}>
                    <h5>Businesses Helped</h5>
                    <p>
                      We provide OEM parts on eBay and Amazon for more than 7k+
                      Apple Service Providers & Repair Centers around the states
                      and South America.
                    </p>
                  </div>
                </div>

                {/* ======NUMBER BOX_END====== */}

                <div className={styles.trusted_right_box}>
                  <div className={styles.trasted_vlue}>
                    <h6>800+</h6>
                  </div>
                  <div className={styles.trasted_vluenum}>
                    <h5>OEM Parts</h5>
                    <p>
                      We carry more than 800 parts in stock. All our parts are
                      Original and Authentic. We provide parts to more than 200
                      business around the united states alone.
                    </p>
                  </div>
                </div>

                {/* ======NUMBER BOX_END====== */}
              </div>
            </Col>
            {/* ======TRUSTED IMG COLUMN END======= */}
          </Row>
        </div>
      </Container>
    </section>
  );
}
