import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import ptm4 from "../../../public/assets/images/support/vector.png";

export default function Maintenance() {
  return (
    <>
      <section className='reachus-section mrt50'>
        <Container>
          <div className='main-reach'>
            <div className='main_heading-gradiant'>
              <h2>
                <b>Site is undergoing changes!</b>
              </h2>
              <p className='maintenance-pera'>
                As we prepare for the new year, we’re updating our website and
                inventory. Feel free to reach out if you’d like to place an
                order
              </p>
            </div>

            <div className='address-box-full'>
              <Row className='justify-content-center'>
                <Col md={4} lg={4}>
                  <div className='address-box'>
                    <h5>Address</h5>
                    <FaMapMarkerAlt />
                    <Link href='tel:+1 (916) 735-5966'>
                      <Link
                        className=''
                        target='_blank'
                        href='https://www.google.com/maps/place/500+Cirby+Way+d,+Roseville,+CA+95678,+USA/@38.7287858,-121.2932779,19z/data=!3m1!4b1!4m5!3m4!1s0x809b2071959a5e59:0xf7f2c06df04a9a!8m2!3d38.7287848!4d-121.2926342?entry=ttu'
                      >
                        500 Cirby Way, Suite D
                        <br />
                        Roseville, CA 95678
                      </Link>
                    </Link>
                  </div>
                </Col>
                {/* <Col md={1} lg={1}></Col> */}
                <Col md={4} lg={4}>
                  <div className='address-box'>
                    <h5>Main Phone</h5>
                    <FaPhoneAlt />
                    <p>Office / Store</p>
                    <Link href='tel:+1 (916) 735-5966'>+1 (916) 735-5966</Link>
                  </div>
                </Col>

                <Col md={4} lg={4}>
                  <div className='address-box'>
                    <h5>Director of Operations</h5>
                    <FaPhoneAlt />
                    {/* <p>Issa Rashid</p> */}
                    <Link href='tel:+1 (279) 599-0139'>+1 (279) 599-0139</Link>

                    <Link href='tel:+1 (916) 735-5966'>+1 (916) 735-5966</Link>
                  </div>
                </Col>
              </Row>

              {/* ==ROW END====== */}
              <div className='support-linebox'>
                <Row className='justify-content-center'>
                  <Col md={12}>
                    <div className='support-lineboxrow'>
                      <h2 className='text-center'>
                        <b>Support Lines </b>
                      </h2>
                      <Row className='justify-content-center'>
                        <Col md={12}>
                          <div className='vimg'>
                            <Image
                              src={ptm4}
                              alt='Apple Fix Pro Mac Img'
                              className='img-fluid'
                            />
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className='lines-box'>
                            <p>Sales / Trades</p>
                            <Link href='tel:+1 (279) 465-7132'>
                              +1 (279) 465-7132
                            </Link>
                          </div>
                        </Col>

                        <Col md={3}>
                          <div className='lines-box'>
                            <p>Management</p>
                            <Link href='tel:+1 (279) 599-0139'>
                              +1 (279) 599-0139
                            </Link>
                          </div>
                        </Col>

                        <Col md={3}>
                          <div className='lines-box'>
                            <p>Tech-lead</p>
                            <Link href='tel:+1 (415) 646-5031'>
                              +1 (415) 646-5031
                            </Link>
                          </div>
                        </Col>

                        <Col md={3}>
                          <div className='lines-box'>
                            <p>Appointments</p>
                            <Link href='tel:+19167355966'>
                            +1 (916) 735-5966
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
