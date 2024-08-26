import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Link from "next/link";

const Sellwcondition = ({ handleChange, handleInput,workingCondition }) => {
 
  return (
    <div className="mwbox">
      <div className="repair-form sellfrom sell-infofrom mrt100">
        <h2>is your device in working condition?</h2>
        <Row className="mb-3 justify-content-center infofrom">
          <Col md={12} className="text-center">
            <Form>
              {["radio"].map((type) => (
                <div key={`inline-${type}`} className="mb-3 custom-radio newborder">
                  <Form.Check                  
                    className="col-md-5"  
                    inline
                    label="not working"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                    value="not_working"
                    onClick={event => handleInput(event)}
                    // checked={workingCondition=="not_working"?true:false}
                    defaultChecked={workingCondition=="not_working"?true:false}
                  />
                  <Form.Check                  
                    className="col-md-5"
                    inline
                    label="working"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                    value="working"
                    onClick={event => handleInput(event)}
                    // checked={workingCondition=="working"?true:false}
                    defaultChecked={workingCondition=="working"?true:false}
                  />
                </div>
              ))}
            </Form>
            {/* <Row className="mb-3 text-center nw-mob">
              <Col md={6}>
                <Link href="">
                  <a className="main_btn nw-btn hvr-shutter-out-horizontal ">
                    not working
                  </a>
                </Link>
              </Col>
              <Col md={6}>
                <Link href="">
                  <a className="main_btn hvr-shutter-out-horizontal ">
                    working
                  </a>
                </Link>
              </Col>
            </Row> */}
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
      </div>
    </div>
  );
};

export default Sellwcondition;
