import Link from "next/link";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BiChevronsRight, BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import Image from "next/image";
import Fp1 from "../../../public/assets/images/footer/paypalf.webp";
import Fp2 from "../../../public/assets/images/footer/americalf.webp";
import Fp3 from "../../../public/assets/images/footer/masterf.webp";
import Fp4 from "../../../public/assets/images/footer/visaf.webp";
import Fp5 from "../../../public/assets/images/footer/cashapp.webp";
import Fp6 from "../../../public/assets/images/footer/Arcrel.png";

export default function FooterComp() {
  return (
    <section className="main_footer mrt80">
      <div className="desk_footer">
        <Container>
          <div className="footer-full">
            <div className="footer-linkbox">
              <Row>
                <Col md={3}>
                  <div className="footer_box">
                    <div className="footer_img">
                      <Link href="/" className="footer_logo">
                        <p>
                          <span>Apple Fix Pros</span>
                        </p>
                      </Link>
                    </div>

                    <div className="footer_boxul">
                      <ul className="flogoul">
                        <li>
                          <Link
                            className=""
                            target="_blank"
                            href="https://maps.app.goo.gl/wQcbJ9oSng4C9y3P8"
                            // href='https://www.google.com/maps/place/500+Cirby+Way+d,+Roseville,+CA+95678,+USA/@38.7287858,-121.2932779,19z/data=!3m1!4b1!4m5!3m4!1s0x809b2071959a5e59:0xf7f2c06df04a9a!8m2!3d38.7287848!4d-121.2926342?entry=ttu'
                          >
                            <BiMap />
                            500 Cirby Way, Suite D
                            <br />
                            Roseville, CA 95678
                          </Link>
                        </li>

                        <li>
                          <Link href="tel:+19167355966">
                            <BiPhone />
                            +1 (916) 735 5966
                          </Link>
                        </li>

                        <li>
                          <Link href="mailto:info@applefixpros.com">
                            <BiEnvelope /> info@applefixpros.com
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>

                {/* ======FOOTER COLUMN END======= */}

                <Col md={9}>
                  <div className="rl-footer">
                    <Row>
                      <Col md={4}>
                        <div className="footer_box">
                          <h2>Explore</h2>

                          <div className="footer_boxul">
                            <ul>
                              <li>
                                <Link href="/mac-sale">
                                  <BiChevronsRight />
                                  Mac Sale
                                </Link>
                              </li>

                              <li>
                                <Link href="/mac-repair">
                                  <BiChevronsRight />
                                  Mac Repair
                                </Link>
                              </li>

                              <li>
                                <Link href="/mac-parts">
                                  <BiChevronsRight /> Mac Parts
                                </Link>
                              </li>

                              <li>
                                <Link href="/sell-your-mac">
                                  <BiChevronsRight /> Sell your Mac
                                </Link>
                              </li>

                              <li>
                                <Link href="/support">
                                  <BiChevronsRight />
                                  Mac Support
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      {/* ======FOOTER COLUMN END======= */}

                      <Col md={4}>
                        <div className="footer_box">
                          <h2>Products</h2>

                          <div className="footer_boxul">
                            <ul>
                              <li>
                                <Link
                                  href={`/mac-sale/macbook-pro-sale?id=${process.env.NEXT_PUBLIC_MACBOOK_PRO_ID}`}
                                >
                                  <BiChevronsRight />
                                  MacBook Pro
                                </Link>
                              </li>

                              <li>
                                <Link
                                  href={`/mac-sale/macbook-air-sale?id=${process.env.NEXT_PUBLIC_MACBOOK_AIR_ID}`}
                                >
                                  <BiChevronsRight />
                                  MacBook Air
                                </Link>
                              </li>

                              <li>
                                <Link
                                  href={`/mac-sale/imac-sale?id=${process.env.NEXT_PUBLIC_IMAC_ID}`}
                                >
                                  <BiChevronsRight /> iMac
                                </Link>
                              </li>

                              <li>
                                <Link
                                  href={`/mac-sale/mac-mini-thunderbolt-display-sale?id=${process.env.NEXT_PUBLIC_MAC_MINI_ID}`}
                                >
                                  <BiChevronsRight /> Mac mini
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      {/* ======FOOTER COLUMN END======= */}

                      <Col md={4}>
                        <div className="footer_box">
                          <h2>Other Stuff</h2>

                          <div className="footer_boxul">
                            <ul>
                              <li>
                                <Link
                                  href="http://business.applefixpros.com/"
                                  // href={`${process.env.NEXT_PUBLIC_B2B_BASE_URL}`}
                                >
                                  <BiChevronsRight />
                                  Shop Wholesale
                                </Link>
                              </li>

                              <li>
                                <Link
                                  // href={`${process.env.NEXT_PUBLIC_B2B_BASE_URL}/liquidation`}
                                  href="https://business.applefixpros.com/liquidation"
                                >
                                  <BiChevronsRight /> Liquidation
                                </Link>
                              </li>
                              <li>
                                <Link href="/privacy">
                                  <BiChevronsRight />
                                  Privacy Policy
                                </Link>
                              </li>

                              <li>
                                <Link href="/refund">
                                  <BiChevronsRight /> Returns & Refunds
                                </Link>
                              </li>
                              <li>
                                <Link href="/delivery">
                                  <BiChevronsRight /> Pickup & Delivery
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      {/* ======FOOTER COLUMN END======= */}
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>

        <div className="footer-bottom">
          <Container>
            <div className="footer-social">
              <Row>
                <Col md={7}>
                  <div className="footer_sbox">
                    <p>We Accept:</p>
                    <ul>
                      <li>
                        <Link href="/">
                          <Image
                            src={Fp1}
                            alt="Apple Fix Pro Payment Img"
                            className="img-fluid"
                          />
                        </Link>
                      </li>

                      <li>
                        <Link href="/">
                          <Image
                            src={Fp2}
                            alt="Apple Fix Pro Payment Img"
                            className="img-fluid"
                          />
                        </Link>
                      </li>

                      <li>
                        <Link href="/">
                          <Image
                            src={Fp3}
                            alt="Apple Fix Pro Payment Img"
                            className="img-fluid"
                          />
                        </Link>
                      </li>

                      <li>
                        <Link href="/">
                          <Image
                            src={Fp5}
                            alt="Apple Fix Pro Payment Img"
                            className="img-fluid"
                          />
                        </Link>
                      </li>

                      <li>
                        <Link href="/">
                          <Image
                            src={Fp4}
                            alt="Apple Fix Pro Payment Img"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>

                {/* =======COLUMN END===== */}

                <Col md={5}>
                  <div className="footer-copyright">
                    <Row>
                      <Col md={12}>
                        <p>
                          Copyright © 2024
                          <Link href="/"> Apple Fix Pros.</Link>
                          All rights reserved
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>

                {/* =======COLUMN END===== */}
              </Row>
            </div>
          </Container>
        </div>
      </div>

      {/* =======DESKTOP FOOTER END======== */}

      <div className="mobile_footer">
        <Container>
          <div className="footer-full">
            <div className="footer-linkbox">
              <Row>
                <Col md={12}>
                  <div className="footer_img">
                    <Link href="/" className="footer_logo">
                      <p>
                        <span>Apple Fix Pros</span>
                      </p>
                    </Link>
                  </div>

                  <div className="footer_box">
                    <h2>Quick Link</h2>

                    <div className="footer_boxul">
                      <ul>
                        <li>
                          <Link href="/">Home</Link>
                        </li>

                        <li>
                          <Link href="/mac-sale">Mac Sale</Link>
                        </li>

                        <li>
                          <Link href="/mac-repair">Mac Repair</Link>
                        </li>

                        <li>
                          <Link href="/mac-parts">Mac Parts</Link>
                        </li>

                        <li>
                          <Link href="/sell-your-mac">Sell Your Mac</Link>
                        </li>

                        <li>
                          <Link href="/support">Support</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                {/* ======FOOTER COLUMN END======= */}

                {/* =======FOOTER COLUMN END===== */}
                <Col md={12} className="fw0">
                  <div className="footer_sbox">
                    <h2>We accept</h2>
                    <ul>
                      <li>
                        <Link href="/">
                          <Image
                            src={Fp1}
                            alt="Apple Fix Pro Payment Img"
                            className="img-fluid"
                          />
                        </Link>
                      </li>

                      <li>
                        <Link href="/">
                          <Image
                            src={Fp2}
                            alt="Apple Fix Pro Payment Img"
                            className="img-fluid"
                          />
                        </Link>
                      </li>

                      <li>
                        <Link href="/">
                          <Image
                            src={Fp3}
                            alt="Apple Fix Pro Payment Img"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <Image
                            src={Fp5}
                            alt="Apple Fix Pro Payment Img"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <Image
                            src={Fp4}
                            alt="Apple Fix Pro Payment Img"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>

                {/* =======COLUMN END===== */}

                <Col md={12}>
                  <div className="fm_copy">
                    <p>
                      Copyright © 2024
                      <Link href="/"> Apple Fix Pros.</Link>
                      All rights reserved
                    </p>
                  </div>
                </Col>

                {/* =======FOOTER COLUMN END===== */}
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
