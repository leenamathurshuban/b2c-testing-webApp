import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

export const DeviceIdentificationForm = ({ dataFromChild, ansOfQuestions }) => {
  const [formInput, setFormInput] = useState({ name: '', email: '', phone_number: '' })
  const [errorMsg, setErrorMsg] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value
    })
    setErrorMsg({
      ...errorMsg,
      [name]: ''
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(ansOfQuestions, dataFromChild)
    const errors = {};
    if (!formInput?.name || !formInput?.email || !formInput?.phone_number) {
      if (!formInput?.name) {
        errors.name = "Required"
      }
      if (!formInput?.email) {
        errors.email = 'Required'
      }
      if (!formInput?.phone_number) {
        errors.phone_number = "Required"
      }
      await setErrorMsg(errors)
    } else {
      var mailTemplate = `<!DOCTYPE html>
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
                padding: 8px;">device_type</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${ansOfQuestions.device_type}</td>
              </tr>
              <tr>
              <th style="border: 1px solid #ddd;
                padding: 8px;">series</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${ansOfQuestions.series}</td>
              </tr>
              <tr>
              <th style="border: 1px solid #ddd;
                padding: 8px;">device_name</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${ansOfQuestions.device_name}</td>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Name</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${formInput.name}</td>
              </tr>               
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Phone Number</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${formInput.phone_number}</td>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Email Id</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${formInput.email}</td>
              </tr>
              <tr>               
              <th style="border: 1px solid #ddd;
              padding: 8px;">Serial Number</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${ansOfQuestions.serialNumber}</td>
              </tr>
              <tr>
              <th style="border: 1px solid #ddd;
              padding: 8px;">Does your device power on?</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${ansOfQuestions.device_power}</td>
              </tr>
              <tr>
              <th style="border: 1px solid #ddd;
              padding: 8px;">Does the device function properly?</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${ansOfQuestions.device_function}</td>
              </tr>
              <tr>
              <th style="border: 1px solid #ddd;
              padding: 8px;">Is the device in good physical condition?</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${ansOfQuestions.physical_condition}</td>
              </tr>
              <tr>
              <th style="border: 1px solid #ddd;
              padding: 8px;">Will the working power adapter be included?</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${ansOfQuestions.power_adapter}</td>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Shipping</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${"shipping"}</td>
              </tr>
            </table>
          </body>
      </html>`;
      const sendData = {
        sendTo: "sales@applefixpros.com",
        // sendTo: formData.email,
        subject: "Website Inquiry - Sell Your Mac",
        template: mailTemplate,
      };
      setIsLoading(true);
      await axios
        .post(`/api/sendMail`, sendData)
        .then(res => {
          setIsLoading(false);
          // toast.success("Email sent successfully", { duration: 5000 });
        })
        .catch(err => {
          setIsLoading(false);
          toast.error('Something went wrong!', { duration: 5000 })
        });
      setIsLoading(false);
      setTimeout(() => {
        // window.location.reload()
        router.push({
          pathname: "sell-your-system",
          query: true
        }, '/sell-your-system')
      }, 4000)
    }
  }
  return (
    <div>
      <Toaster />
      <section className="main_macsalecomp">
        <Container>
          <div className="main_heading inner_gheading">
            <div className="cardbox">
              <Row className="justify-content-center">
                <Col md={12} lg={4}>
                  <Card border="0">
                    <Card.Body>
                      <div className="mac-repair-new-sell">
                        <ul className="mb-4">
                          {Object.entries(dataFromChild)?.map(
                            ([key, value]) => (
                              <li key={key}>
                                <span className="response-title">
                                  <b>{key}:</b>
                                </span>
                                <span className="response-value">
                                  {value}
                                </span>
                              </li>
                            ))}
                          <span style={{ cursor: 'pointer' }}>X Wrong one? Use a different Serial</span>
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

      <div className='row'>
        <div className='col-md-2'>
          <h4>Shipping</h4>
        </div>
        <div className='col-md-10'>
          <ul className='list_device device'>
            <li className={'active'} >
              <div className='inner_box'>
                <div className='icon'>
                  {/* <img src=
                      {Val?.images?.[0]?.src || 'https://cdn.shopify.com/s/files/1/0265/9971/8971/files/mac_image.png?v=1732883311'} /> */}
                  <h4>Receive a Phobio Shipping Kit</h4>
                  {/* Packaging designed for optimal device protection sent to you within 5 business days */}
                </div>
                <div className='cnt'>
                  <p><span></span> <b></b></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <section className='file-repair-main mrt100'>
        <Container>
          <div className='file-repair-full'>
            <Row className='justify-content-center cl-4tab'>
              <Col md={6} lg={6} xl={4}>
                <div className='file_box_main'>
                  <div className='file_box text-center'>
                    <h6>Your Shipping Information</h6>
                    <p>We'll send your prepaid shipping label and supplies in 3-5 business days.</p>
                  </div>
                  <div className='repair-form-multi'>
                    <div className='repair-form'>
                      <Form
                        onSubmit={(e) => handleSubmit(e)}
                      // className={isSubmitForm ? "mb-3 d-none" : "mb-3"}
                      >
                        <Row className='mb-3'>
                          <Col md={6}>
                            <Form.Group className='' controlId='formGridName'>
                              <Form.Control
                                type='text'
                                placeholder='Name'
                                name='name'
                                onChange={(e) => handleChange(e)}
                              // value={capitalize(form_data.name)}
                              // className={validation.name ? "has-error " : ""}
                              // required
                              />
                            </Form.Group>
                            <span style={{ fontSize: '11px', color: 'red' }}>{errorMsg.name}</span>
                          </Col>
                          <Col md={6}>
                            <Form.Group
                              className='mob-inmargin'
                              controlId='formGridPNumber'
                            >
                              <Form.Control
                                type='tel'
                                placeholder='Phone Number'
                                name='phone_number'
                                onChange={(e) => handleChange(e)}
                                // value={form_data.phone_number_format}
                                // className={
                                //   validation.phone_number ? "has-error" : ""
                                // }
                                // onKeyDown={enforceFormat}
                                // onKeyUp={formatToPhone}
                                maxLength='16'
                              // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                              // required
                              />
                            </Form.Group>
                            <span style={{ fontSize: '11px', color: 'red' }}>{errorMsg.phone_number}</span>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col md={12}>
                            <Form.Group as={Col} controlId='formGridEmail'>
                              <Form.Control
                                type='email'
                                placeholder='Email Address'
                                name='email'
                                onChange={(e) => handleChange(e)}
                              // value={form_data.email}
                              // className={validation.email ? "has-error" : ""}
                              // required
                              />
                            </Form.Group>
                            <span style={{ fontSize: '11px', color: 'red' }}>{errorMsg.email}</span>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col md={12}>
                            <div className='repair-btn'>
                              <Button
                                type='submit'
                                className='main_btn hvr-shutter-out-horizontal'
                              >
                                Submit
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                      <Row
                      // className={isSubmitForm ? "mb-3" : "mb-3 d-none"}
                      >
                        <Col md={12}>
                          <div className='tspopup-main text-center'>
                            {/* <h2>Thank You!</h2>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Accumsan, ridiculus pulvinar sed sed feugiat
                              rhoncus.
                            </p> */}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </div>
  )
}
