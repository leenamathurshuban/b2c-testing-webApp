import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";

const Sellfstep = ({ handleChangeSelect, selectedValue, error }) => {
  const options = [
    // { label: "grade your mac quality", value: "grade your mac quality" },
    // { label: "new", value: "new" },
    { label: "Liquid Damage", value: "Liquid Damage" },
    { label: "Power issues", value: "Power issues" },
    { label: "Battery issues", value: "Battery issues" },
    {
      label: "Cracked LCD/Screen/Display",
      value: "Cracked LCD/Screen/Display",
    },
    { label: "Activation lock", value: "Activation lock" },
    { label: "EFI lock", value: "EFI lock" },
    { label: "MDM Remote management", value: "MDM Remote management" },
    { label: "Charging Issues", value: "Charging Issues" },
    { label: "Remote management", value: "Remote management" },
    { label: "Unknown", value: "Unknown" },
    // {
    //   label: "Storage HDD/SSD (Hard Drive) Issues",
    //   value: "Storage HDD/SSD (Hard Drive) Issues",
    // },
    // { label: "iMac Upgrades", value: "iMac Upgrades" },
    // { label: "Keyboard Issues", value: "Keyboard Issues" },
    // { label: "Touchpad/ Trackpad Issues", value: "Touchpad/ Trackpad Issues" },
    // {
    //   label: "Malware/Spyware/Virus Issues",
    //   value: "Malware/Spyware/Virus Issues",
    // },
    // { label: "Tune-Up and Speed Issues", value: "Tune-Up and Speed Issues" },
    // { label: "Sound Issues", value: "Sound Issues" },
    // { label: "macOS Issues", value: "macOS Issues" },
    // { label: "GPU/Graphic Issues", value: "GPU/Graphic Issues" },
    // {
    //   label: "Connectivity Issues (Wi-Fi-Airport-Bluetooth)",
    //   value: "Connectivity Issues (Wi-Fi-Airport-Bluetooth)",
    // },
    // {
    //   label: "Time Capsule/Time Machine Issues",
    //   value: "Time Capsule/Time Machine Issues",
    // },
    // { label: "FaceTime (Camera) Issues", value: "FaceTime (Camera) Issues" },
    // {
    //   label: "Data Recovery/Recovery/Restore",
    //   value: "Data Recovery/Recovery/Restore",
    // },
    // {
    //   label: "Ports Issues (MagSafe- USB, Audio Jack, HDMI)",
    //   value: "BluPorts Issues (MagSafe- USB, Audio Jack, HDMI)",
    // },
  ];

  return (
    <div className="selld-from mrt100">
      <Form>
        <h2>Choose the reason it is not working properly</h2>
        <Row className="mb-3 justify-content-center">
          <Col md={12}>
            <div className="select-fgroup">
              <MultiSelect
                options={options}
                value={selectedValue}
                onChange={(values) =>
                  handleChangeSelect(values, "reasonNotWorking")
                }
                labelledBy={"Select"}
                isCreatable={true}
                className={error ? "has-error_sell_mac" : ""}
              />
            </div>
            {/* <div className="text-danger mt-2">{error}</div> */}
            {/* <Form.Group className="select-fgroup" controlId="formGridName">
              <Form.Select size="lg" aria-label="Default select example">
                <option>select all that type</option>
                <option>Liquid Damage</option>
                <option>Power issues</option>
                <option>Battery issues</option>
                <option>Cracked screen</option>
                <option>Activation lock</option>
                <option>EFI lock</option>
                <option>Remote management</option>
              </Form.Select>
            </Form.Group> */}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Sellfstep;
