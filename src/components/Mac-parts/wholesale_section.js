import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Form, Button, Col,Link } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import LoaderComp from "../Loader/loader_comp";
import { enforceFormat, formatToPhone } from "@/lib/helpers";
import wholesaleimg from "../../../public/assets/images/macparts-img/wholesaleimg.jpg";
import Image from "next/image";

const notify = () => toast.success("submited.");

export default function WholesalepartsComp() {
  const [isLoading, setIsLoading] = useState(false);

  const [form_data, set_form_data] = useState({
    business_name: "",
    owner_name: "",
    address: "",
    phone_number: "",
    email: "",
    tax_id: "",
  });
  const [errors, set_errors] = useState({
    business_name: "",
    owner_name: "",
    address: "",
    phone_number: "",
    email: "",
    tax_id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "business_name":
        set_form_data({ ...form_data, business_name: value });
        break;
      case "owner_name":
        set_form_data({ ...form_data, owner_name: value });
        break;
      case "address":
        set_form_data({ ...form_data, address: value });
        break;
      case "phone_number":
        set_form_data({ ...form_data, phone_number: value });
        break;
      case "email":
        set_form_data({ ...form_data, email: value });
        break;
      case "tax_id":
        set_form_data({ ...form_data, tax_id: value });
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errorsGet = { ...errors };

    if (!form_data.business_name) {
      errorsGet.business_name = "Business Name is required";
      set_errors(errorsGet);
      return false;
    } else {
      errorsGet.business_name = "";
      set_errors(errorsGet);
    }
    //owner_name validation
    if (!form_data.owner_name) {
      errorsGet.owner_name = "Owner Name is required";
      set_errors(errorsGet);
      return false;
    } else {
      errorsGet.owner_name = "";
      set_errors(errorsGet);
    }
    //owner_name validation
    if (!form_data.address) {
      errorsGet.address = "Address is required";
      set_errors(errorsGet);
      return false;
    } else {
      errorsGet.address = "";
      set_errors(errorsGet);
    }
    //phone_number validation
    if (!form_data.phone_number) {
      errorsGet.phone_number = "Phone Number is required";
      set_errors(errorsGet);
      return false;
    }
    // else if (!form_data.phone_number.match(/^\d*$/)) {
    //   errorsGet.phone_number = "Phone number is number.";
    //   return false;
    // }
    else {
      errorsGet.phone_number = "";
      set_errors(errorsGet);
    }
    // email validation

    if (!form_data.email) {
      errorsGet.email = "Email is required";
      set_errors(errorsGet);
      return false;
    } else if (!form_data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      errorsGet.email = "Please Enter a valid email address";
      set_errors(errorsGet);
      return false;
    } else {
      errorsGet.email = "";
      set_errors(errorsGet);
    }

    // await MacPartsWebhook(form_data);

    // SENDGRID START
    const sendData = {
      sendTo: "ahmed@applefixpros.com",
      subject: "Website Inquiry- Parts Wholesale",
      template: `<!DOCTYPE html>
        <html>
            <body>
              <div>
                 <h1 style="text-align: center;">
                    <a href="#" style=" display: inline-block; color:black;"><span style="">Apple Fix Pros</span></a>
                </h1>
                <p style="text-align: center;">Thank you for connecting with us, we will get back to you soon! </p>
                
              </div>
                <table style="font-family: Arial, Helvetica, sans-serif;
                border-collapse: collapse;
                width: 100%;">
                <tr>
                  <th style="border: 1px solid #ddd;
                padding: 8px;">Business Name</th>
                  <td style="border: 1px solid #ddd;
                  padding: 8px;">${form_data.business_name}</td>
                </tr>
                <tr>
                  <th style="border: 1px solid #ddd;
                padding: 8px;">Owner Name</th>
                  <td style="border: 1px solid #ddd;
                  padding: 8px;">${form_data.owner_name}</td>
                </tr>
                <tr>
                  <th style="border: 1px solid #ddd;
                  padding: 8px;">Address</th>
                  <td style="border: 1px solid #ddd;
                  padding: 8px;">${form_data.address}</td>
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
                padding: 8px;">Tax ID</th>
                  <td style="border: 1px solid #ddd;
                  padding: 8px;">${form_data.tax_id}</td>
                </tr>
              </table>
            </body>
        </html>`,
    };
    setIsLoading(true);
    await axios
      .post(`/api/sendMail`, sendData)
      .then((res) => {
        toast.success(
          "Thank you for connecting with us, we will get back to you soon!"
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong!");
      });
    // SENDGRID END
    setIsLoading(false);
    set_form_data({
      business_name: "",
      owner_name: "",
      address: "",
      phone_number: "",
      email: "",
      tax_id: "",
    });
    // notify();
  };

  // Mac parts form webhook
  async function MacPartsWebhook(params) {
    setIsLoading(true);
    await axios
      .post(process.env.NEXT_PUBLIC_MacPartsWebhook, params)
      .then((res) => {
        // setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        // toast.error("Something went wrong!");
      });
  }

  return (
    <>
      {isLoading ? <LoaderComp /> : ""}
      <section className='main_trusted wholesale_section mrt100 mrb100'>
        <Container>
          <div className='trusted-full' data-aos='fade-down'>
            <Row className='justify-content-center'>
              <Col md={6} lg={4}>
                <div className='trusted_box-left wholesale_left'>
                  <h2>Wholesale</h2>
                  <p>
                    Are you a repair store? Are you a distributor or wholesaler?
                    We Offer expedited shipping and bulk prices. Please submit
                    this form and our sales Department will call you back.
                  </p>
                  <div className="wholesale-img">
                    
                      <Image
                        src={wholesaleimg}
                        alt="Apple Fix Pro Check Img"
                        priority={true}
                        className="img-fluid wd100"
                        width={150}
                        height={150}
                      />
                 
              </div>
                </div>
              </Col>
              {/* ======WHOLESALE CONTENT COLUMN END======= */}
              <Col md={6} lg={4}>
                <div className='wholesale_form'>
                  <div className='repair-form'>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                      <Row className='mb-3'>
                        <Col md={6}>
                          <Form.Group className='' controlId='formGridbname'>
                            <Form.Control
                              type='text'
                              placeholder='Business Name*'
                              name='business_name'
                              onInput={(event) => handleChange(event)}
                              className={
                                errors.business_name ? "has-error" : ""
                              }
                              value={form_data.business_name}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group
                            className='mob-inmargin'
                            controlId='formGridonumber'
                          >
                            <Form.Control
                              type='text'
                              placeholder='Owner/Manager Name*'
                              name='owner_name'
                              onInput={(event) => handleChange(event)}
                              className={errors.owner_name ? "has-error" : ""}
                              value={form_data.owner_name}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className='mb-3'>
                        <Col md={12}>
                          <Form.Group as={Col} controlId='formGridadd'>
                            <Form.Control
                              type='text'
                              placeholder='Address*'
                              name='address'
                              onInput={(event) => handleChange(event)}
                              className={errors.address ? "has-error" : ""}
                              value={form_data.address}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className='mb-3'>
                        <Col md={6}>
                          <Form.Group
                            className='mob-inmargin phn-mm'
                            controlId='formGridPNumber'
                          >
                            <Form.Control
                              type='text'
                              placeholder='Phone Number*'
                              name='phone_number'
                              onInput={(event) => handleChange(event)}
                              className={errors.phone_number ? "has-error" : ""}
                              value={form_data.phone_number}
                              onKeyDown={enforceFormat}
                              onKeyUp={formatToPhone}
                              maxLength={16}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group
                            as={Col}
                            controlId='formGridEmail'
                            className='mob-inmargin'
                          >
                            <Form.Control
                              type='email'
                              placeholder='Email*'
                              name='email'
                              onInput={(event) => handleChange(event)}
                              className={errors.email ? "has-error" : ""}
                              value={form_data.email}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className='mb-3'>
                        <Col md={12}>
                          <Form.Group as={Col} controlId='formGridTax'>
                            <Form.Control
                              type='text'
                              placeholder='Tax ID/EIN'
                              name='tax_id'
                              onInput={(event) => handleChange(event)}
                              className={errors.tax_id ? "has-error" : ""}
                              value={form_data.tax_id}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className='mb-3'>
                        <Col md={12}>
                          <div className='repair-btn'>
                            <Button
                              type='submit'
                              className='main_btn hvr-shutter-out-horizontal'
                              // onClick={notify}
                            >
                              Submit
                            </Button>
                            <Toaster />
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </div>
              </Col>
              {/* ======WHOLESALE FORM COLUMN END======= */}
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
}
// =======SECTION END========
