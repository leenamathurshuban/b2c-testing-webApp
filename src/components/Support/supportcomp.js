import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import Iframe from "react-iframe";
import ptm4 from "../../../public/assets/images/support/vector.png";
import LoaderComp from "../Loader/loader_comp";
import toast, { Toaster } from "react-hot-toast";
import TestiComp from "../Testimonial";
import { enforceFormat, formatToPhone } from "@/lib/helpers";

export default function MacsupportComp() {
  const [isLoading, setIsLoading] = useState(false);
  const [form_data, set_form_data] = useState({
    name: "",
    email: "",
    phone_number: "",
    desc: "",
  });
  const [errors, setError] = useState({
    name: "",
    email: "",
    phone_number: "",
    desc: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        set_form_data({ ...form_data, name: value });
        break;
      case "phone_number":
        set_form_data({ ...form_data, phone_number: value });
        break;
      case "email":
        set_form_data({ ...form_data, email: value });
        break;
      case "desc":
        set_form_data({ ...form_data, desc: value });
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errorsGet = { ...errors };

    if (!form_data.name) {
      errorsGet.name = "Name is required";
      setError(errorsGet);
      return false;
    } else {
      errorsGet.name = "";
      setError(errorsGet);
    }

    //phone_number validation
    if (!form_data.phone_number) {
      errorsGet.phone_number = "Phone Number is required";
      setError(errorsGet);
      return false;
    }
    // else if (!form_data.phone_number.match(/^\d*$/)) {
    //   errorsGet.phone_number = "Phone number is number.";
    //   return false;
    // }
    else {
      errorsGet.phone_number = "";
      setError(errorsGet);
    }
    // email validation

    if (!form_data.email) {
      errorsGet.email = "Email is required";
      setError(errorsGet);
      return false;
    } else if (!form_data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      errorsGet.email = "Please Enter a valid email address";
      setError(errorsGet);
      return false;
    } else {
      errorsGet.email = "";
      setError(errorsGet);
    }
    if (!form_data.desc) {
      errorsGet.desc = "Description is required";
      setError(errorsGet);
      return false;
    } else {
      errorsGet.desc = "";
      setError(errorsGet);
    }

    await SupportWebhook(form_data);

    // SENDGRID START
    const sendData = {
      sendTo: "management@applefixpros.com",
      subject: "Website Inquiry - Support",
      template: `<!DOCTYPE html>
        <html>
            <body>

                <div>
            		 <h1 style="text-align: center;">
                    <a href="#" style=" display: inline-block; color:black;"><span style="">Apple Fix Pros</span></a>
                </h1>
                <p style="text-align: center;">Here is your new customer's details</p>
            		
            	</div>
               
                <table style="font-family: Arial, Helvetica, sans-serif;
                border-collapse: collapse;
                width: 100%;">
                
                <tr>
                  <th style="border: 1px solid #ddd;
                padding: 8px;">Name</th>
                  <td style="border: 1px solid #ddd;
                  padding: 8px;">${form_data.name}</td>
                </tr>               
                <tr>
                  <th style="border: 1px solid #ddd;
                  padding: 8px;">Phone Number</th>
                  <td style="border: 1px solid #ddd;
                  padding: 8px;">${form_data.phone_number}</td>
                </tr>
                <tr>
                  <th style="border: 1px solid #ddd;
                  padding: 8px;">Email Id</th>
                  <td style="border: 1px solid #ddd;
                  padding: 8px;">${form_data.email}</td>
                </tr>
                <tr>               
                <th style="border: 1px solid #ddd;
                padding: 8px;">Description</th>
                  <td style="border: 1px solid #ddd;
                  padding: 8px;">${form_data.desc}</td>
                </tr>
              </table>
            </body>
        </html>`,
    };
    setIsLoading(true);
    await axios
      .post(`/api/sendMail`, sendData)
      .then((res) => {
        setIsLoading(false);
        toast.success(
          "Thank you for connecting with us, we will get back to you soon! "
        );
      })
      .catch((err) => {
        setIsLoading(false);
        // toast.error("Something went wrong!");
      });
    setIsLoading(false);
    // SENDGRID END
    set_form_data({
      name: "",
      email: "",
      phone_number: "",
      desc: "",
    });
  };
  // Support form webhook
  async function SupportWebhook(params) {
    setIsLoading(true);
    await axios
      .post(process.env.NEXT_PUBLIC_SupportWebhook, params)
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        // toast.error("Something went wrong!");
      });
  }

  return (
    <>
      {isLoading ? <LoaderComp /> : ""}
      <Toaster />
      <section className="reachus-section mrt80">
        <Container>
          <div className="main-reach">
            <div className="main_heading-gradiant-p">
              <h1>
                <b>Need to reach us?</b>
              </h1>
            </div>

            <div className="address-box-full">
              <Row className="justify-content-center">
                <Col md={4} lg={4}>
                  <div className="address-box">
                    <h5>Address</h5>
                    <FaMapMarkerAlt />
                    <Link
                      className=""
                      target="_blank"
                      // href='https://www.google.com/maps/place/500+Cirby+Way+d,+Roseville,+CA+95678,+USA/@38.7287858,-121.2932779,19z/data=!3m1!4b1!4m5!3m4!1s0x809b2071959a5e59:0xf7f2c06df04a9a!8m2!3d38.7287848!4d-121.2926342?entry=ttu'
                      href="https://maps.app.goo.gl/wQcbJ9oSng4C9y3P8"
                    >
                      500 Cirby Way, Suite D
                      <br />
                      Roseville, CA 95678
                    </Link>
                  </div>
                </Col>

                <Col md={4} lg={4}>
                  <div className="address-box">
                    <h5>Main Phone</h5>
                    <FaPhoneAlt />
                    <p>Office / Store</p>
                    <Link href="tel:+1 (916) 735-5966" className="">
                      +1 (916) 735-5966
                    </Link>
                  </div>
                </Col>

                <Col md={4} lg={4}>
                  <div className="address-box">
                    <h5>Director of Operations</h5>
                    <FaPhoneAlt />

                    <Link href="tel:+1 (279) 599-0139" className="">
                      +1 (279) 599-0139
                    </Link>
                    <Link href="tel:+1 (916) 771 0672" className="">
                      +1 (916) 771 0672
                    </Link>
                  </div>
                </Col>
              </Row>

              {/* ==ROW END====== */}
              <div className="support-linebox">
                <Row className="justify-content-center">
                  <Col md={12}>
                    <div className="support-lineboxrow">
                      <h2 className="text-center">
                        <b>Support Lines </b>
                      </h2>
                      <Row className="justify-content-center">
                        <Col md={12}>
                          <div className="vimg">
                            <Image
                              src={ptm4}
                              alt="Apple Fix Pro Mac Img"
                              className="img-fluid"
                            />
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className="lines-box">
                            <p>Sales / Trades</p>
                            <Link href="tel:+1 (279) 465-7132" className="">
                              +1 (279) 465-7132
                            </Link>
                          </div>
                        </Col>

                        <Col md={3}>
                          <div className="lines-box">
                            <p>Management</p>
                            <Link href="tel:+1 (279) 599-0139" className="">
                              +1 (279) 599-0139
                            </Link>
                          </div>
                        </Col>

                        <Col md={3}>
                          <div className="lines-box">
                            <p>Tech-lead</p>
                            <Link href="tel:+1 (415) 646-5031" className="">
                              +1 (415) 646-5031
                            </Link>
                          </div>
                        </Col>

                        <Col md={3}>
                          <div className="lines-box">
                            <p>Appointments</p>
                            <Link href="tel:+19167355966" className="">
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

      <section className="support-form">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} lg={7} xl={4}>
              <div className="repair-form">
                <div className="file_box text-center mrb50">
                  <h2>Prefer If We Reach Out?</h2>
                </div>

                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group className="mob-mr20" controlId="formGridName">
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          onInput={(event) => handleChange(event)}
                          value={form_data.name}
                          name="name"
                          className={errors.name ? "has-error " : ""}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        className="mob-inmargin"
                        controlId="formGridPNumber"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Phone Number"
                          onInput={(event) => handleChange(event)}
                          value={form_data.phone_number}
                          name="phone_number"
                          className={errors.phone_number ? "has-error " : ""}
                          onKeyDown={enforceFormat}
                          onKeyUp={formatToPhone}
                          maxLength={16}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={12}>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Control
                          type="email"
                          placeholder="Email Address"
                          onInput={(event) => handleChange(event)}
                          value={form_data.email}
                          name="email"
                          className={errors.email ? "has-error " : ""}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Control
                          as="textarea"
                          placeholder="How can we help?"
                          onInput={(event) => handleChange(event)}
                          value={form_data.desc}
                          name="desc"
                          className={errors.desc ? "has-error " : ""}
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
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="main_macsupport geth2 mrt50">
        <Container>
          <div className="main_heading text-center">
            <h2>
              <b>Come Visit Our Store</b>
            </h2>
          </div>
        </Container>

        <div className="map-box">
          <Container fluid>
            <div className="map-box-full">
              {/* <Iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.1304588259242!2d-121.29327793039099!3d38.72878584445273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809b2071959a5e59%3A0xf7f2c06df04a9a!2s500%20Cirby%20Way%20d%2C%20Roseville%2C%20CA%2095678%2C%20USA!5e0!3m2!1sen!2sin!4v1685591038261!5m2!1sen!2sin"
                width="100%"
                height="600px"
                id="mymap"
                className="mapifrme"
                display="initial"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                position="relative"
                title="myFrame"
              /> */}

              <Iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d49801.88273537719!2d-121.30874704604834!3d38.72658602911479!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809adfd83537b07f%3A0x3d5cb8d809eac5a4!2sApple%20Fix%20Pros%20LLC!5e0!3m2!1sen!2sin!4v1715055130489!5m2!1sen!2sin"
                width="100%"
                height="600px"
                id="mymap"
                className="mapifrme"
                display="initial"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                position="relative"
                title="myFrame"
              />
            </div>
          </Container>
        </div>
      </section>
      {/* <div className="mac-testimonial">
        <TestiComp />
      </div> */}

      {/* // ======MAP SECTION END==== */}
    </>
  );
}
