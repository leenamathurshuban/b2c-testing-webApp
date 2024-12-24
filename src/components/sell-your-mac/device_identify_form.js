import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShippingInfo = [
  `We will provide a free shipping label`,
  `Before Shipping Your Device:`,
  `Ensure you are completely signed out of iCloud.`,
  `Remove the device from the "Find My Mac" section in your iCloud account.`,
  `Back up any important data, as we cannot be held responsible for data loss.`,
  `Our R2 Licensed facility will provide a Data Erasure and Sanitization Certification via email once the device is purchased.`,
  `After the inspection is complete, you will receive a call or email from our Sales or Technical Department with the final offer.`
];

export const DeviceIdentificationForm = ({ dataFromChild, ansOfQuestions, prices }) => {
  const [formInput, setFormInput] = useState({ first_name: '', last_name: '', email: '', phone_number: '', city: '', state: '', zip_code: '', address1: '', address2: '' })
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
    if (!formInput?.first_name || !formInput?.email || !formInput?.phone_number || !formInput?.city ||
      !formInput?.address1 || !formInput?.last_name || !formInput?.state || !formInput?.zip_code) {
      if (!formInput?.first_name) {
        errors.first_name = "Required"
      }
      if (!formInput?.last_name) {
        errors.last_name = "Required"
      }
      if (!formInput?.email) {
        errors.email = 'Required'
      }
      if (!formInput?.phone_number) {
        errors.phone_number = "Required"
      }
      if (!formInput?.city) {
        errors.city = "Required"
      }
      if (!formInput?.address1) {
        errors.address1 = "Required"
      }
      if (!formInput?.state) {
        errors.state = "Required"
      }
      if (!formInput?.zip_code) {
        errors.zip_code = "Required"
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
                padding: 8px;">First Name</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${formInput.first_name}</td>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Last Name</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${formInput.last_name}</td>
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
                padding: 8px;">City</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${formInput.city}</td>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Address Line 1</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${formInput.address1}</td>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Address Line 2</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${formInput.address2}</td>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">State/Province</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${formInput.state}</td>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Notes</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${ansOfQuestions.notes}</td>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">ZIP / Postal Code</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${formInput.zip_code}</td>
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
          // toast.success("Successfully submitted your request. We will get back to you with an offer by email or call or iMessage.", { duration: 5000 });
          toast.success("Email sent successfully");
        })
        .catch(err => {
          setIsLoading(false);
          // toast.error('Something went wrong!', { duration: 5000 })
          toast.error('Something went wrong!')
        });
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload()
      }, 4000)
    }
  }
  console.log(formInput)
  return (
    <div>
      <ToastContainer autoClose={4000} />
      <section className="main_macsalecomp sell_mac_list">
        <div className="main_heading inner_gheading">
          <div className="mac-repair-new-sell">
            <ul className="mb-12">
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
            </ul>
          </div>
        </div>
      </section>
      <div className='row'>
        <div className='col-md-2'>
          <h4>Price</h4>
        </div>
        <div className='col-md-10'>
          <ul className='list_device device'>
            <li className={'active'} >
              <div className='inner_box'>
                <div className='icon'>
                  <h4>{prices}</h4>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-2'>
          <h4>Payment</h4>
        </div>
        <div className='col-md-10'>
          <ul className='list_device shipping'>
            <li>
              <p>Payment will be processed after inspecting the item. We will contact you when the payment is ready. We use Apple Pay, Venmo, CashApp, PayPal or Check.</p>
            </li>
          </ul>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-2'>
          <h4>Shipping</h4>
        </div>
        <div className='col-md-10'>
          <ul className='list_device shipping'>
            {ShippingInfo?.map((list, index) => (
              <li>
                <p>{index <= 1 ? '' : `${index - 1}.`} {list}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <section className='file-repair-main mt-3'>
        <Container>
          <div className='file-repair-full'>
            <Row className='justify-content-center cl-4tab'>
              <Col md={12}>
                <div className='file_box_main'>
                  <div className='title_header mt-4'>
                    <h2>Please provide your basic information details</h2>
                    {/* <p className='haddingh_h2'>We'll send your prepaid shipping label and supplies in 3-5 business days.</p> */}
                  </div>
                  <div className='repair-form-multi'>
                    <div className='repair-form'>
                      <span>All information is necessary can’t be skipped*</span>
                      <Form
                        onSubmit={(e) => handleSubmit(e)}
                      // className={isSubmitForm ? "mb-3 d-none" : "mb-3"}
                      >
                        <Row className='mb-3'>
                          <Col md={6}>
                            <Form.Group className='' controlId='formGridName'>
                              <Form.Control
                                type='text'
                                placeholder='First Name*'
                                name='first_name'
                                onChange={(e) => handleChange(e)}
                              />
                            </Form.Group>
                            <span style={{ fontSize: '11px', color: 'red' }}>{errorMsg.first_name}</span>
                          </Col>
                          <Col md={6}>
                            <Form.Group
                              className='mob-inmargin'
                              controlId='formGridPNumber'
                            >
                              <Form.Control
                                type='text'
                                placeholder='Last Name*'
                                name='last_name'
                                onChange={(e) => handleChange(e)}
                                maxLength='16'
                              />
                            </Form.Group>
                            <span style={{ fontSize: '11px', color: 'red' }}>{errorMsg.last_name}</span>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col md={12}>
                            <Form.Group as={Col} controlId='formGridEmail'>
                              <Form.Control
                                type='text'
                                placeholder='Address Line 1*'
                                name='address1'
                                onChange={(e) => handleChange(e)}
                              />
                            </Form.Group>
                            <span style={{ fontSize: '11px', color: 'red' }}>{errorMsg.address1}</span>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col md={12}>
                            <Form.Group as={Col} controlId='formGridEmail'>
                              <Form.Control
                                type='text'
                                placeholder='Address Line 2'
                                name='address2'
                                onChange={(e) => handleChange(e)}
                              />
                            </Form.Group>
                            {/* <span style={{ fontSize: '11px', color: 'red' }}>{errorMsg.email}</span> */}
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col md={6}>
                            <Form.Group
                              className='mob-inmargin'
                              controlId='formGridPNumber'
                            >
                              <Form.Control
                                type='tel'
                                placeholder='Phone Number*'
                                name='phone_number'
                                onChange={(e) => handleChange(e)}
                                maxLength='16'
                              />
                            </Form.Group>
                            <span style={{ fontSize: '11px', color: 'red' }}>{errorMsg.phone_number}</span>
                          </Col>
                          <Col md={6}>
                            <Form.Group className='' controlId='formGridName'>
                              <Form.Control
                                type='text'
                                placeholder='City*'
                                name='city'
                                onChange={(e) => handleChange(e)}
                              />
                            </Form.Group>
                            <span style={{ fontSize: '11px', color: 'red' }}>{errorMsg.city}</span>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col md={6}>
                            <Form.Group
                              className='mob-inmargin'
                              controlId='formGridPNumber'
                            >
                              <Form.Control
                                type='text'
                                placeholder='State/Province*'
                                name='state'
                                onChange={(e) => handleChange(e)}
                                maxLength='16'
                              />
                            </Form.Group>
                            <span style={{ fontSize: '11px', color: 'red' }}>{errorMsg.state}</span>
                          </Col>
                          <Col md={6}>
                            <Form.Group className='' controlId='formGridName'>
                              <Form.Control
                                type='text'
                                placeholder='ZIP / Postal Code*'
                                name='zip_code'
                                onChange={(e) => handleChange(e)}
                              />
                            </Form.Group>
                            <span style={{ fontSize: '11px', color: 'red' }}>{errorMsg.zip_code}</span>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col md={12}>
                            <Form.Group as={Col} controlId='formGridEmail'>
                              <Form.Control
                                type='email'
                                placeholder='Email Address*'
                                name='email'
                                onChange={(e) => handleChange(e)}
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
