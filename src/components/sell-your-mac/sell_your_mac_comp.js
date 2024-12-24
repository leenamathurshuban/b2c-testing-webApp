import Link from "next/link";
import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sellmfrom from "./sellmfrom";
import MacSerialLookupComp from "../Mac-repair/lookupform";

export default function MacsaleyourComp() {
  const [dataFromChild, setDataFromChild] = useState(null);
  const [type, setType] = useState(null);

  const handleDataFromChild = (e, data) => {
    setDataFromChild(data);
    setType(e);
  };

  return (
    // <section className="main_macsalecomp ">
      <Container>
        {dataFromChild && type == "sell" ? (
          <section className="main_macsalecomp pdt100">
            <Container>
              <div className="main_heading inner_gheading">
                <h6>
                  Looking to sell <span>Your Mac?</span>
                </h6>
                <p>
                  Apple Fix Pros will buy your MacBook Air, MacBook Pro, iMac,
                  and Mac Mini products.
                </p>
                <div className="cardbox">
                  <Row className="justify-content-center">
                    <Col md={12} lg={4}>
                      <Card border="0">
                        <Card.Body>
                          {/* <Card.Title className="d-flex item-center justify-content-center">
                            Model configuration 
                          </Card.Title> */}
                          <div className="mac-repair-new-sell">
                            <ul className="mb-4">
                              {Object.entries(dataFromChild).map(
                                ([key, value]) => (
                                  <li key={key}>
                                    <span className="response-title">
                                      <b>{key}:</b>
                                    </span>
                                    <span className="response-value">
                                      {value}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </Container>
          </section>
        ) : (
          <>
            {/* <div className="main_heading-gradiant-p">
            <h1>
              Looking to sell <b>Your Mac?</b>
            </h1>
          </div> */}
            {/* <div className="more-repair sellmaccomp">
              <h4>Sell your Mac system is down.</h4>
              <p>
                Please contact our purchase/sales department <br />
                <Link href="tel:+12795990139" className="">
                  +1 (916)735-5966
                </Link>
              </p>
            </div> */}
          </>
        )}
        {/* <MacSerialLookupComp sendDataToParent={handleDataFromChild} /> */}
        {/* <div className="more-repair sellmaccomp">
          <h4>Do you have more than one MacBook to sell?</h4>
          <p>
            Please contact our sales department <br />
            <Link href="tel:+12795990139" className="">
              +1(279) 599-0139
            </Link>
          </p>
        </div> */}
        {/* <div className="main_heading-gradiant-p">
            <h1>
              Looking to sell <b>Your Mac?</b>
            </h1>
          </div> */}
      </Container>
    // </section>
  );
}
