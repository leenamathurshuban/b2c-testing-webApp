import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import parse from "html-react-parser";
import axios from "axios";
import LoaderComp from "../Loader/loader_comp";

export default function MacSerialLookupComp() {
  const [form_data_serial, set_form_data_serial] = useState({
    serial_number: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSerial, setIsLoadingSerial] = useState(false);

  const [lgShow, setLgShow] = useState(false);
  const [validation, setValidation] = useState({
    serial_number: "",
  });

  // ===go popup==
  const [show, setShow] = useState(false);

  const [ShowData, setShowData] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  // ===go popup==

  // ===THANKS popup==
  const [showt, setShowt] = useState(false);

  const handleCloset = () => setShowt(false);
  const handleShowt = () => setShowt(true);
  // ===THANKS popup==

  const handleChangeSerial = (e) => {
    const { name, value } = e.target;
    // let formErrors = formErrors;

    switch (name) {
      case "serial_number":
        set_form_data_serial({ ...form_data_serial, serial_number: value });
        break;
      default:
        break;
    }
    checkValidation("serial_number");
  };
  useEffect(() => {
    // checkValidation();
  }, [form_data_serial]);

  const handleSubmit = async (e, type = "") => {
    e.preventDefault();

    const { name, value } = e.target;

    let errors = { ...validation };

    if (type == "serial_number") {
      if (!form_data_serial.serial_number.trim()) {
        errors.serial_number = "Serial number is required";
        setValidation(errors);
        return false;
      } else {
        errors.serial_number = "";
        setValidation(errors);
      }
      handleShow();
      window.localStorage.removeItem("last_serial_response");
      window.localStorage.removeItem("new_last_serial_response");
      window.localStorage.removeItem("last_serial_number");

      if (
        window.localStorage.getItem("api_last_serial_response") != null &&
        window.localStorage.getItem("api_last_serial_number") ==
          form_data_serial.serial_number
      ) {
        const last_serial_data = window.localStorage.getItem(
          "api_last_serial_response"
        );
        setShowData(last_serial_data);
        setIsLoadingSerial(false);
      } else {
        setIsLoadingSerial(true);
        await axios
          .get(`https://shop.applefixpros.com/wp-json/custom-woo/v1/external/${form_data_serial.serial_number}`)
          .then((res) => {
            if (res.data != "Error E02: IMEI or SN is Wrong!") {
              window.localStorage.setItem("api_last_serial_response", res.data.response);
              window.localStorage.setItem(
                "api_last_serial_number",
                form_data_serial.serial_number
              );
            }
            setShowData(res.data.response);
            setIsLoadingSerial(false);
          });
      }
    }
  };

  const checkValidation = (type = "") => {
    //
    let errors = { ...validation };

    if (type == "serial_number") {
      //serial_number validation
      if (!form_data_serial.serial_number.trim()) {
        errors.serial_number = "Serial number is required";
      } else {
        errors.serial_number = "";
      }
    }
  };

  return (
    <>
      {isLoading ? <LoaderComp /> : ""}
      <div className="lockno-box">
        <Container>
          <Row className="justify-content-center">
            <Col md={3}>
              <div className="lockup-box">
                <h2>Mac serial lookup</h2>
              </div>
            </Col>
            {/* <Col md={12}>
                <div className="serial-box">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Accumsan, ridiculus pulvinar sed sed feugiat rhoncus.
                </p>
                </div>
            </Col> */}

            <Col md={6}>
              <div className="repair-form">
                <Form onSubmit={(e) => handleSubmit(e, "serial_number")}>
                  <Row className="mb-3">
                    <Col md={8}>
                      <Form.Group className="" controlId="formGridSnumber">
                        <Form.Control
                          type="text"
                          placeholder="Serial Number"
                          name="serial_number"
                          onChange={(e) => handleChangeSerial(e)}
                          value={form_data_serial.serial_number}
                          className={
                            validation.serial_number ? "has-error" : ""
                          }
                        />
                      </Form.Group>

                      <p className="seriaal-model">
                        Finding Your Serial
                        <span onClick={handleShowt}> click here </span>
                      </p>
                    </Col>
                    <Col md={3}>
                      <div className="repair-btn">
                        <Button
                          type="submit"
                          className="main_btn hvr-shutter-out-horizontal"
                          // onClick={handleShow}
                        >
                          go
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ======MODAL GO START=== */}
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="gomodel-full"
      >
        <Modal.Header closeButton>
          <Modal.Title>Mac Serial Lookup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={isLoadingSerial ? "d-none gopopup-main" : "gopopup-main"}
          >
            {parse(ShowData)}
          </div>
          <div
            className={
              isLoadingSerial ? "gopopup-main" : "gopopup-main d-none "
            }
          >
            <div
              className="skeleton mt-2 mb-4"
              style={{ height: "150px" }}
            ></div>
            <div className="skeleton mt-2 mb-2"></div>
            <div className="skeleton mt-2 mb-2"></div>
            <div className="skeleton mt-2 mb-2"></div>
            <div className="skeleton mt-2 mb-2"></div>
            <div className="skeleton mt-2 mb-2"></div>
          </div>
        </Modal.Body>
      </Modal>
      {/* =======MODAL GO END====== */}

      {/* ======MODAL THANKS START=== */}
      <Modal
        show={showt}
        onHide={handleCloset}
        animation={false}
        className="ts-full"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Thank You</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="tspopup-main">
            <h2> If Your Mac Turns On </h2>
            <p>
              If your Mac is working properly, finding the serial number is
              easy. Just click the Apple menu icon at the top of the screen and
              select “About This Mac”. You’ll see the serial number displayed
              along with your Mac’s model number, hardware specifications, and
              the version of macOS you have installed
            </p>
            <h2>If Your Mac Won’t Turn On</h2>
            <p>
              Your Mac’s serial number is printed somewhere on the Mac itself,
              so you’ll be able to find it if you can’t turn your Mac on. Flip
              over a MacBook and you’ll see the serial number and model number
              printed on the Mac itself, near the “Designed by Apple in
              California” text. On a Mac Mini, you’ll find the serial number on
              the bottom. On the Mac Pro, you’ll find it on the back panel.
            </p>
          </div>
        </Modal.Body>
      </Modal>
      {/* =======MODAL THANKS END====== */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
// =======BANNER END========
