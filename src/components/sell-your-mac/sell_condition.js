import { Container, Row, Col, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
const Sellcondition = ({ handleChangeSelect, selectedValue, error }) => {
  const options = [
    // { label: "grade your mac quality", value: "grade your mac quality" },
    // { label: "new", value: "new" },
    { label: "New", value: "New" },
    { label: "Grade A", value: "Grade A" },
    { label: "Grade B", value: "Grade B" },
    { label: "Grade C", value: "Grade C" },
    { label: "Salvage", value: "Salvage" },
  ];

  const [selected, setSelected] = useState([]);
  return (
    <>
      <div className=" mrt100 selld-from">
        <Form>
          <h2>describe the device's condition as best you can</h2>
          <Row className="mb-3 justify-content-center">
            <Col md={12}>
              <div className="select-fgroup">
                <Form.Select
                  className={error ? "has-error_sell_mac" : ""}
                  value={selectedValue}
                  onChange={values =>
                    handleChangeSelect(values, "device_conditions")
                  }
                >
                  <option value={""}>Select</option>
                  {options.map((val, key) => {
                    return (
                      <option value={val.value} key={key}>
                        {val.label}
                      </option>
                    );
                  })}
                </Form.Select>
                {/* <MultiSelect
                  options={options}
                  value={selectedValue}
                  onChange={(values)=>handleChangeSelect(values,"device_conditions")}
                  labelledBy={"Select"}
                  isCreatable={true}
                  hasSelectAll={false}
                  className={error?"has-error_sell_mac":""}
                /> */}
              </div>
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
    </>
  );
};

export default Sellcondition;
