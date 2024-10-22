import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { enforceFormat, formatToPhone } from "../../lib/helpers";

const Sellinfo = ({ handleChange, errors, values }) => {
  return (
    <div className='repair-form sellfrom sell-infofrom mrt100'>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h2>Please enter your information below</h2>
        <Row className='justify-content-center infofrom'>
          <Col md={12}>
            <Row className='mb-3'>
              <Col md={12}>
                <Form.Group className='' controlId='formGridName'>
                  <Form.Control
                    type='text'
                    onInput={(event) => handleChange(event)}
                    value={values.name}
                    name='name'
                    placeholder='Full Name'
                    className={errors.name ? "has-error mb-2" : "mb-2"}
                  />
                </Form.Group>
                {/* // <div className="text-danger mb-3">{errors.name}</div> */}
              </Col>
              <Col md={12}>
                <Form.Group as={Col} controlId='formGridEmail'>
                  <Form.Control
                    className={errors.email ? "has-error mb-2" : "mb-2"}
                    type='email'
                    placeholder='Email Address'
                    value={values.email}
                    onInput={(event) => handleChange(event)}
                    name='email'
                  />
                </Form.Group>
                {/* <div className="text-danger mb-3">{errors.email}</div> */}
              </Col>
              <Col md={12}>
                <Form.Group
                  className='mob-inmargin'
                  controlId='formGridPNumber'
                >
                  <Form.Control
                    className={errors.phone_number ? "has-error mb-2" : "mb-2"}
                    type='text'
                    placeholder='Phone Number'
                    value={values.phone_number}
                    onInput={(event) => handleChange(event)}
                    onKeyDown={enforceFormat}
                    onKeyUp={formatToPhone}
                    name='phone_number'
                    maxLength={16}
                  />
                </Form.Group>
                {/* <div className="text-danger mb-3">{errors.phone_number}</div> */}
              </Col>
            </Row>
          </Col>
        </Row>

        {/* <Row className="mb-3">
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
        </Row> */}
      </Form>
    </div>
  );
};

export default Sellinfo;
