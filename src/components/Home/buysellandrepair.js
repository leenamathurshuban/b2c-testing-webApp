import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../Home/home.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function BuyrepairComp() {
  const setAOSDataArr = [
    {
      data_aos: "fade-down",
      data_aos_img: "/assets/images/buyrepair-section/buy-mac.webp",
      data_aos_heading: `Buy`,
      data_aos_content: `Which Mac is right for you? We sell New and Certified Macs.`,
      data_aos_btnText: `Browse Macs`,
      path: "/mac-sale",
      className: `${styles.repair_para} ${styles.buy_content_div}`,
      ColClassName: `${styles.buyrepair_box} ${styles.buy_content_col}`,
    },
    {
      data_aos: "fade-down",
      data_aos_img: "/assets/images/buyrepair-section/sell-mac.webp",
      data_aos_heading: `Sell`,
      data_aos_content: `Are you Planning to upgrade and sell your old Mac? We pay more than Apple Buy back or Trade-in programs.`,
      data_aos_btnText: `Sell us your mac`,
      path: "/sell-your-mac",
      className: `${styles.repair_para} ${styles.sell_content_div}`,
      ColClassName: `${styles.buyrepair_box} ${styles.sell_content_col}`,
    },
    {
      data_aos: "fade-down",
      data_aos_img: "/assets/images/buyrepair-section/repair-mac.webp",
      data_aos_heading: `Repair`,
      data_aos_content: `Apple Fix Pros offers a wide range of fixed-price upgrades and repairs for your Apple computers. You can drop in our office in Citrus Heights or if you are not local, you can either have us collect or send in your computer yourself. Same-day fitting is available for most computers. We fix what Apple won't, TIA A+ certified specialists. We offer free estimates/diagnoses for all computer jobs. No Repair = No Pay.`,
      data_aos_btnText: `Fix IT UP`,
      path: "/mac-repair",
      className: `${styles.repair_para} ${styles.repair_content_div}`,
      ColClassName: `${styles.buyrepair_box} ${styles.repair_content_col}`,
    },
  ];
  const [getAosData, setAOSData] = useState(setAOSDataArr);

  return (
    <section className='main_buyrepair mrt50'>
      <Container>
        <div className='main_heading-gradiant'>
          <h2>
            <b>Buy, Sell and Repair</b>
          </h2>
        </div>

        <div className='buyrepair-full mrt50'>
          <Row>
            {getAosData.map((value, index) => (
              <Col
                md={4}
                key={index}
                data-aos={value.data_aos}
                data-aos-easing='linear'
              >
                <div className={value.ColClassName}>
                  <div className={styles.buyrepair_icon}>
                    <Image
                      src={value.data_aos_img}
                      alt='Apple Fix Pro Buy-Img'
                      layout='fill'
                      className='img-fluid'
                    />
                  </div>
                  <div className={styles.buyrepair_content}>
                    <h2>{value.data_aos_heading}</h2>
                    <p className={value.className}>{value.data_aos_content}</p>
                    <div className='repairbox-btn text-center'>
                      <Link
                        href={value.path}
                        className='main_btn hvr-shutter-out-horizontal '
                      >
                        {value.data_aos_btnText}
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}

            {/* =======COLUMN FOUR END====== */}
          </Row>
        </div>
      </Container>
    </section>
  );
}
