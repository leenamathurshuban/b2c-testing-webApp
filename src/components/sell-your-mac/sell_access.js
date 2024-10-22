import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";

const Sellaccesserise = ({ handleChangeSelect, selectedValue, error }) => {
  const options = [
    // { label: "grade your mac quality", value: "grade your mac quality" },
    // { label: "new", value: "new" },
    {
      label: "Apple Original Power Adapter",
      value: "Apple Original Power Adapter",
    },
    {
      label: "Apple Wireless Keyboard & Mouse 1st generation",
      value: "Apple Wireless Keyboard & Mouse 1st generation",
    },
    {
      label: "Apple Wireless Keyboard & Mouse 2nd generation",
      value: "Apple Wireless Keyboard & Mouse 2nd generation",
    },
    {
      label: "Apple Wired Keyboard & Mouse",
      value: "Apple Wired Keyboard & Mouse",
    },
    // { label: "Activation lock", value: "Activation lock" },
    { label: "Time Capsule", value: "Time Capsule" },
  ];

  return (
    <div className=" mrt100 selld-from">
      <Form>
        <h2>Do you have any accessories?</h2>
        <Row className="mb-3 justify-content-center">
          <Col md={12}>
            <div className="select-fgroup">
              <MultiSelect
                options={options}
                value={selectedValue}
                defaultValue={selectedValue}
                onChange={(values) =>
                  handleChangeSelect(values, "sell_accessories")
                }
                labelledBy={"Test"}
                // isCreatable={true}
                className={error ? "has-error_sell_mac" : ""}
              />
              {/* <div className="text-danger mt-2">{error}</div> */}
              {/* <Form.Group className="" controlId="formGridName">
                <Form.Select size="lg">
                  <option>Choose all that apply</option>
                  <option>Apple Original Power Adapter</option>
                  <option>
                    Apple Wireless Keyboard & Mouse 1st generation{" "}
                  </option>
                  <option>
                    Apple Wireless Keyboard & Mouse 2nd generation
                  </option>
                  <option>Apple Wired Keyboard & Mouse</option>
                  <option>Time Capsule</option>
                </Form.Select>
              </Form.Group> */}
            </div>
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

export default Sellaccesserise;
