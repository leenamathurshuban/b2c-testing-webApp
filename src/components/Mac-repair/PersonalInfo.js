import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const PersonalInfo = ({ handleChange }) => {
  return (
    <>
      <div className='repair-form'>
        <Form>
          <Row className='mb-3'>
            <Col md={6}>
              <Form.Group className='' controlId='formGridName'>
                <Form.Control type='text' placeholder='Name' />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mob-inmargin' controlId='formGridPNumber'>
                <Form.Control type='text' placeholder='Phone Number' />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col md={12}>
              <Form.Group as={Col} controlId='formGridEmail'>
                <Form.Control type='email' placeholder='Email Address' />
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md={12}>
              <Form.Group className='mb-3' controlId='formGridAddress1'>
                <Form.Control as='textarea' placeholder='Describe your issue' />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      <div className='repair-form'>
        <Form>
          <Row className='mb-3'>
            <Col md={12}>
              <Form.Group className='' controlId='formGridSnumber'>
                <Form.Control type='text' placeholder='Serial Number' />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default PersonalInfo;
