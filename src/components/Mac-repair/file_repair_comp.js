import React, { useState } from "react";
import Link from "next/link";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import Image from "next/image";
import CheckImage from "../../../public/assets/images/mac-repair/check-setting.png";
import MultiForm from "./multifrom";

export default function FileRepairComp() {
  const [lgShow, setLgShow] = useState(false);
  const [makeSerial, setmakeSerial] = useState(false);

  function UpdateMakeSerial() {
    setmakeSerial(!makeSerial);
  }

  return (
    <>
      <section className="file-repair-main mrt100">
        <Container>
          <div
            className={
              makeSerial ? "file-repair-full makeSerial" : "file-repair-full"
            }
          >
            <div className="lockno-box">
              <Row className="justify-content-center align-items-center">
                <Col md={4}>
                  <div className="lockup-box">
                    <h2>
                      Mac <span> serial lookup</span>
                    </h2>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center">
                <Col md={12}>
                  <div className="serial-box">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Accumsan, ridiculus pulvinar sed sed feugiat rhoncus.
                    </p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="repair-form mrt50">
                    <Form>
                      <Row className="mb-3">
                        <Col md={12}>
                          <Form.Group className="" controlId="formGridSnumber">
                            <Form.Control
                              type="text"
                              placeholder="Serial Number"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
            <Row className="justify-content-center">
              <Col md={4}>
                <div className="file_box_main">
                  <div className="file_box text-center">
                    <h6>File a Repair</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Accumsan, ridiculus pulvinar sed sed feugiat rhoncus.
                    </p>
                  </div>
                  <div className="repair-form-multi">
                    <MultiForm UpdateMakeSerial={UpdateMakeSerial} />
                  </div>
                </div>
              </Col>
              {/* ======FILE CONTENT COLUMN END======= */}

              <Col md={4}>
                <div className="check_box_main">
                  <div className="file_box text-center check-status">
                    <h6>Check Status</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Accumsan, ridiculus pulvinar sed sed feugiat rhoncus.
                    </p>

                    <div
                      className="view-check-box"
                      onClick={() => setLgShow(true)}
                    >
                      <div className="checkbox-img">
                        <Image
                          src={CheckImage}
                          alt="Apple Fix Pro Check Img"
                          priority={true}
                          className="img-fluid wd100"
                        />
                        <div className="viewcheck-link">
                          <Link href="">
                            <a href="">View your status</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              {/* ======CHECK STATUS COLUMN END======= */}
            </Row>
          </div>
        </Container>
      </section>

      {/* ======MODEL START====== */}

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="status-model"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="repair-popup-box">
            <h6>Enter Repair Number</h6>
            <div className="repair-form repair-from-popup">
              <Form>
                <Row className="mb-3 justify-content-center">
                  <Col md={7}>
                    <Form.Group className="" controlId="formGridSnumber">
                      <Form.Control
                        type="text"
                        placeholder="Enter Repair Status Code"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <div className="repair-btn">
                      <Button
                        type="submit"
                        className="main_btn hvr-shutter-out-horizontal"
                      >
                        Get status
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ======MODEL START====== */}
    </>
  );
}
// =======BANNER END========
