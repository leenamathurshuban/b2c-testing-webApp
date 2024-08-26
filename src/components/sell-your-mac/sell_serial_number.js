import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Sellfnumber = ({ handleChange, handleInput, serialNumber, error }) => {
  return (
    <div className="repair-form sellfrom">
      <Form>
        <Row className="mb-3 justify-content-center">
          <Col md={12}>
            <span className="text-start fw-bold manual-span">Manually</span>
            <h2>Enter Your Device's Serial Number</h2>
            <Form.Group className="" controlId="formGridSnumber">
              <Form.Control
                type="text"
                value={serialNumber}
                onInput={(event) => handleInput(event)}
                placeholder="Serial Number*"
                className={error ? "has-error" : ""}
              />
            </Form.Group>
            {/* <div className="text-danger mt-2">{error}</div> */}
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

export default Sellfnumber;
