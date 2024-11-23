import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MacsalepageComp from "@/components/Mac-sale/Macsalepage";

export default function MacSaleHome({ collections, loading, query }) {

  return (
    <>
      <section className='main_shopmac new_mac_section' id="rrr">
        <div className='shopmac_desktop_new'>
          <Container>
            <div className='main_heading-gradiant-p'>
              {/* <h1>
                Looking for a <b>New Mac?</b>
              </h1>
              <p>Which Mac is right for you? We sell New and Certified Macs</p> */}
            </div>

            <div className='macsalerpro_row'>
              <Row className='justify-content-start'>
                {loading
                  ? new Array(5).fill().map((val, i) => (
                      <Col
                        xl={3}
                        lg={4}
                        md={4}
                        xs={12}
                        className='sell-skl'
                        key={`skel${i}`}
                      >
                        <div className='card'>
                          <div className='card-img skeleton'></div>
                          <div className='card-body'>
                            <h2 className='card-title skeleton'></h2>
                          </div>
                        </div>
                      </Col>
                    ))
                  : collections.length
                  ? collections.map((colVal, index) => {
                      return (
                        <Col xl={3} lg={4} md={4} xs={12} key={index}>
                          <MacsalepageComp propValue={colVal} url={query} />
                        </Col>
                      );
                    })
                  :  ""}
              </Row>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
