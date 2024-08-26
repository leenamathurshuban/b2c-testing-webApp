import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import BannerImage from "../../../public/assets/images/mac-repair/mac-repair-banner.png";

export default function RepairBannerComp() {
  return (
    <section className="main_banner mac_repair_banner">
      <Container>
        <div className="banner-full">
          <Row className="align-items-center">
            <Col md={5}>
              <div className="banner_box text-center">
                <h1>
                  Mac <span> Repair</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Accumsan, ridiculus pulvinar sed sed feugiat rhoncus.
                </p>
              </div>
            </Col>
            {/* ======BANNER CONTENT COLUMN END======= */}
            <Col md={7}>
              <div className="banner_img text-center">
                <Image
                  src={BannerImage}
                  alt="Apple Fix Pro Banner"
                  priority={true}
                  className="img-fluid wd100"
                />
              </div>
            </Col>
            {/* ======BANNER IMG COLUMN END======= */}
          </Row>
        </div>
      </Container>
    </section>
  );
}
// =======BANNER END========
