import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import Image from "next/image";
// import CheckImage from "../../../public/assets/images/mac-repair/check-setting.png";
import CheckImage from "../../../public/assets/images/mac-repair/check-setting.png";
import MultiForm from "./multifrom";
import toast, { Toaster } from "react-hot-toast";
import parse from "html-react-parser";
// const {
//   HTTP_SERVICE_CALL_NO_AUTH,
//   HTTP_SERVICE_CALL,
// } = require("../../provider/ApiProvider");
import axios from "axios";
import LoaderComp from "../Loader/loader_comp";
// import {
//   isNumericInput,
//   formatToPhone,
//   enforceFormat,
// } from "../../lib/helpers";

import jsonData from "./data.json";
// import { NextSeo } from "next-seo";

const availableIssues = [
  "Power Issues",
  "Liquid Damage",
  "EFI Lock",
  "MDM Remote Management ",
  "Activation Lock",
  "Charging Issues",
  "Battery Issues",
  "Storage HDD/SSD (Hard Drive) Issues",
  "Cracked LCD/Screen/Display",
  "iMac Upgrades",
  "Keyboard Issues",
  "Touchpad/ Trackpad Issues",
  "Malware/Spyware/Virus Issues",
  "Tune-Up and Speed Issues",
  "Sound Issues",
  "macOS Issues",
  "GPU/Graphic Issues",
  "Connectivity Issues (Wi-Fi-Airport-Bluetooth)",
  "Time Capsule/Time Machine Issues",
  "FaceTime (Camera) Issues",
  "Data Recovery/Recovery/Restore",
  "Ports Issues (MagSafe- USB – Audio Jack – HDMI)",
];

const data = {
  mac: [
    {
      name: "iMac 21 inch",
      model: ["A1311 (2009-2011)", "A1418 (2012-2017)", "A2116 (2019-2020)"],
    },
    {
      name: "iMac 24 inch",
      model: ["A2439 (2 Ports)", "A2438 (4 Ports)"],
    },

    {
      name: "iMac 27 inch ",
      model: [" A1312 (2009-2011)", "A1419 (2012-2017)", "A2115 (2019-2020)"],
    },

    {
      name: "iMac Pro 27 inch",
      model: [" A1862 (2017)"],
    },

    {
      name: "Mac Pro",
      model: [
        "A1289 (2012)",
        "A1481 Cylinder (2013)",
        "A1991 Tower (2019)",
        "A2304 Rack (2019)",
      ],
    },

    {
      name: "MacBook 12 inch",
      model: ["A1534"],
    },

    {
      name: "MacBook Air 13 inch",
      model: ["A1466", "A1932", "A2179", "A2337", "A2681"],
    },

    {
      name: "MacBook Pro 13 inch",
      model: [
        "A1278",
        "A1425",
        "A1502",
        "A1706",
        "A1708",
        "A1989",
        "A2159",
        "A2251",
        "A2289",
        "A2338",
      ],
    },
    {
      name: "MacBook Pro 14 inch",
      model: ["A2442"],
    },
    {
      name: "MacBook Pro 15 inch",
      model: ["A1286", "A1398", "A1707", "A1990"],
    },

    {
      name: "MacBook Pro 16 inch",
      model: ["A2141", "A2485"],
    },

    {
      name: "Apple Thunderbolt Display 27 inch",
      model: ["A1316", "A1407"],
    },
  ],
};
// ===SELECT DATA ==

export default function RepairFormComp(props) {
  const router = useRouter();

  // ===SELECT DATA ==
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const [selectedMac, setSelectedMac] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [availableModel, setavailableModel] = useState([]);
  const onChangeMac = (e) => {
    let dataMac = data.mac.find((c) => c.name === e.target.value);
    setavailableModel([]);
    if (dataMac) {
      setavailableModel(dataMac.model);
    }
  };
  // ===SELECT DATA ==

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSerial, setIsLoadingSerial] = useState(false);
  const [isLoadingRepair, setIsLoadingRepair] = useState(false);

  const [routerData, setRouterData] = useState({
    size: "",
    mac: "",
    model: "",
  });

  const [lgShow, setLgShow] = useState(false);
  const [form_data_serial, set_form_data_serial] = useState({
    serial_number: "",
  });
  const [form_data_repair, set_form_data_repair] = useState({
    repair_number: "",
  });

  const [form_data, set_form_data] = useState({
    name: "",
    phone_number: "",
    phone_number_format: "",
    email: "",
    mac: "",
    model: "",
    identifier: "",
    serviceIssue: "",
    description: "",
  });
  const [RepairStatus, setRepairStatus] = useState("");

  useEffect(() => {
    const { product_name, tags } = router?.query;

    let foundData;

    for (const key in jsonData?.data?.[tags] ?? {}) {
      foundData = jsonData?.data?.[tags]?.[key].find(
        (item) => item.tags === tags && item.handle === product_name
      );
      if (foundData) {
        setRouterData((presVal) => ({
          ...presVal,
          size: key,
          mac: foundData.title,
          model: foundData.description,
        }));
        break;
      }
    }

    const modelMatch = foundData?.description?.match(/model (\w+)/i);
    const idMatch = foundData?.description?.match(/id (\w+,\w+)/i);
    // const emcMatch = model?.match(/emc (\w+)/i);

    const Macmodel = modelMatch ? modelMatch[1] : "";
    const identifier = idMatch ? idMatch[1] : "";
    // const emc = emcMatch ? emcMatch[ 1 ] : '';

    set_form_data({
      ...form_data,
      mac: foundData?.title ?? "",
      model: Macmodel ?? "",
      identifier: identifier ?? "",
    });
  }, [router.query]);

  const [validation, setValidation] = useState({
    serial_number: "",
    repair_number: "",
    name: "",
    phone_number: "",
    email: "",
    mac: "",
    model: "",
    identifier: "",
    serviceIssue: "",
    description: "",
  });

  const handleChangeSerial = (e) => {
    const { name, value } = e.target;
    // let formErrors = formErrors;

    switch (name) {
      case "serial_number":
        set_form_data_serial({ ...form_data_serial, serial_number: value });
        break;
      default:
        break;
    }
    checkValidation("serial_number");
  };
  const handleChangeRepair = (e) => {
    const { name, value } = e.target;
    // let formErrors = formErrors;

    switch (name) {
      case "repair_number":
        set_form_data_repair({ ...form_data_repair, repair_number: value });
        break;
      default:
        break;
    }
    checkValidation("repair_number");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // let formErrors = formErrors;
    switch (name) {
      case "name":
        set_form_data({ ...form_data, name: value });
        break;
      case "phone_number":
        let phone_number_format = value;

        set_form_data({
          ...form_data,
          phone_number: value,
          phone_number_format: phone_number_format,
        });
        break;
      case "email":
        set_form_data({ ...form_data, email: value });
        break;
      case "mac":
        set_form_data({ ...form_data, mac: value });
        break;
      case "model":
        set_form_data({ ...form_data, model: value });
        break;
      case "identifier":
        set_form_data({ ...form_data, identifier: value });
        break;
      case "serviceIssue":
        set_form_data({ ...form_data, serviceIssue: value });
        break;
      case "description":
        set_form_data({ ...form_data, description: value });
        break;
      default:
        break;
    }
  };
  var checkValidationGlobal = 0;
  var checkValidationSerialGlobal = 0;
  var checkValidationRepairGlobal = 0;

  useEffect(() => {
    // checkValidation();
  }, [form_data, form_data_repair, form_data_serial]);

  const handleSubmit = async (e, type = "") => {
    e.preventDefault();

    const { name, value } = e.target;

    let errors = { ...validation };

    if (type == "serial_number") {
      if (!form_data_serial.serial_number.trim()) {
        errors.serial_number = "Serial number is required";
        setValidation(errors);
        return false;
      } else {
        errors.serial_number = "";
        setValidation(errors);
      }
      handleShow();
      window.localStorage.removeItem("last_serial_response");
      window.localStorage.removeItem("new_last_serial_response");
      window.localStorage.removeItem("last_serial_number");

      if (
        window.localStorage.getItem("api_last_serial_response") != null &&
        window.localStorage.getItem("api_last_serial_number") ==
          form_data_serial.serial_number
      ) {
        const last_serial_data = window.localStorage.getItem(
          "api_last_serial_response"
        );
        setShowData(last_serial_data);
        setIsLoadingSerial(false);
      } else {
        setIsLoadingSerial(true);
        await axios
          .get(`https://shop.applefixpros.com/wp-json/custom-woo/v1/external/${form_data_serial.serial_number}`)
          .then((res) => {
            if (res.data.response != "Error E02: IMEI or SN is Wrong!") {
              window.localStorage.setItem("api_last_serial_response", res.data.response);
              window.localStorage.setItem(
                "api_last_serial_number",
                form_data_serial.serial_number
              );
            }
            setShowData(res.data.response);
            setIsLoadingSerial(false);
          });
      }
    }

    if (type == "repair_number") {
      if (!form_data_repair.repair_number.trim()) {
        errors.repair_number = "Repair number is required";
        setValidation(errors);
        return false;
      } else {
        errors.repair_number = "";
        setValidation(errors);
      }
      setIsLoadingRepair(true);

      await axios
        .get(`/api/file_repair/get_data?id=${form_data_repair.repair_number}`)
        .then((res) => {
          setIsLoadingRepair(false);
          if (res.status == 200) {
            if (res.data.status) {
              setRepairStatus(res.data.data.status);
            } else {
              setRepairStatus(`Please Enter Correct Repair ID`);
            }
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          setIsLoadingRepair(false);
        });
    }
    if (type == "file_repair") {
      // checkValidation(type);
      //first Name validation
      if (!form_data.name) {
        errors.name = "Name is required";
        setValidation(errors);
        return false;
      } else {
        errors.name = "";
        setValidation(errors);
      }
      //phone_number validation
      if (!form_data.phone_number) {
        errors.phone_number = "Phone Number is required";
        setValidation(errors);
        return false;
      }
      // else if (!form_data.phone_number.match(/^\d*$/)) {
      //   errors.phone_number = "Phone number should be number.";
      //   return false;
      // }
      else {
        errors.phone_number = "";
        setValidation(errors);
      }
      // email validation

      if (!form_data.email) {
        errors.email = "Email is required";
        setValidation(errors);
        return false;
      } else if (
        !form_data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ) {
        errors.email = "Please Enter a valid email address";
        setValidation(errors);
        return false;
      } else {
        errors.email = "";
        setValidation(errors);
      }

      if (!props.macrepairnew) {
        //mac validation
        if (!form_data.mac) {
          errors.mac = "Mac is required";
          setValidation(errors);
          return false;
        } else {
          errors.mac = "";
          setValidation(errors);
        }
        //Model validation
        if (!form_data.model) {
          errors.model = "Model is required";
          setValidation(errors);
          return false;
        } else {
          errors.model = "";
          setValidation(errors);
        }
        //Identifier validation
        if (!form_data.identifier) {
          errors.identifier = "identifier is required";
          setValidation(errors);
          return false;
        } else {
          errors.identifier = "";
          setValidation(errors);
        }
      }
      if (!form_data.serviceIssue) {
        errors.serviceIssue = "Issue is required";
        setValidation(errors);
        return false;
      } else {
        errors.serviceIssue = "";
        setValidation(errors);
      }

      //description validation
      if (!form_data.description) {
        errors.description = "Description is required";
        setValidation(errors);
        return false;
      } else {
        errors.description = "";
        setValidation(errors);
      }

      setIsLoading(true);

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      let lastFourDigits = form_data.phone_number.substr(-4);
      const id = `AFP${lastFourDigits}${dd}${mm}`;

      const data = {
        id: id,
        name: form_data.name,
        phone_number: form_data.phone_number,
        phone_number_format: form_data.phone_number_format,
        email: form_data.email,
        mac: form_data.mac,
        model: form_data.model,
        identifier: form_data.identifier,
        serviceIssue: selectedIssue,
        description: form_data.description,
        APIResponse: props?.ShowData ?? "",
        status: "Repair Pending",
      };

      const response = await fetch("/api/file_repair/sheet_create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          if (res.status == 200) {
            setIsLoading(false);

            // SENDGRID START
            const sendData = {
              sendTo: form_data.email,
              subject: "Apple fix pros - File a repair",
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
                        padding: 8px;">ID</th>
                          <td style="border: 1px solid #ddd;
                          padding: 8px;">${data.id}</td>
                        </tr>
                        <tr>
                          <th style="border: 1px solid #ddd;
                        padding: 8px;">Status</th>
                          <td style="border: 1px solid #ddd;
                          padding: 8px;">${data.status}</td>
                        </tr>
                        <tr>
                          <th style="border: 1px solid #ddd;
                          padding: 8px;">Name</th>
                          <td style="border: 1px solid #ddd;
                          padding: 8px;">${data.name}</td>
                        </tr>
                        <tr>
                          <th style="border: 1px solid #ddd;
                          padding: 8px;">Phone Number</th>
                          <td style="border: 1px solid #ddd;
                          padding: 8px;">${data.phone_number}</td>
                        </tr>
                        <tr>
                          <th style="border: 1px solid #ddd;
                          padding: 8px;">Email Id</th>
                          <td style="border: 1px solid #ddd;
                          padding: 8px;">${data.email}</td>
                        </tr>
                        <tr>
                        <th style="border: 1px solid #ddd;
                        padding: 8px;">Mac</th>
                          <td style="border: 1px solid #ddd;
                          padding: 8px;">${data.mac}</td>
                        </tr>
                        <tr>
                        <th style="border: 1px solid #ddd;
                        padding: 8px;">Model</th>
                          <td style="border: 1px solid #ddd;
                          padding: 8px;">${data.model}</td>
                        </tr>
                        <tr>
                        <th style="border: 1px solid #ddd;
                        padding: 8px;">Identifier</th>
                          <td style="border: 1px solid #ddd;
                          padding: 8px;">${data.identifier}</td>
                        </tr>
                        <tr>
                        <th style="border: 1px solid #ddd;
                        padding: 8px;">Service Issue</th>
                          <td style="border: 1px solid #ddd;
                          padding: 8px;">${data.serviceIssue}</td>
                        </tr>
                        <tr>
                        <th style="border: 1px solid #ddd;
                        padding: 8px;">Description</th>
                          <td style="border: 1px solid #ddd;
                          padding: 8px;">${data.description}</td>
                        </tr>
                      </table>
                    </body>
                </html>`,
            };
            await axios
              .post(`/api/sendMail`, sendData)
              .then((res) => {
                // setIsLoading(false);
              })
              .catch((err) => {
                setIsLoading(false);
              });

            setIsLoading(false);
            // SENDGRID END
            toast.success("Form is Successfully submitted");
            router.replace("/thank-you");
            set_form_data({
              name: "",
              phone_number: "",
              phone_number_format: "",
              email: "",
              // mac: "",
              // model: "",
              // identifier:"",
              serviceIssue: "",
              description: "",
            });
            setSelectedMac("");
            setSelectedModel("");
            setSelectedIssue("");
            setavailableModel([]);
          } else {
            setIsLoading(false);
            toast.error("Something went wrong!");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error("Something went wrong!");
        });

      // setIsSubmitForm(true)
    }
  };

  const checkValidation = (type = "") => {
    //
    let errors = { ...validation };

    if (type == "serial_number") {
      //serial_number validation
      if (!form_data_serial.serial_number.trim()) {
        errors.serial_number = "Serial number is required";
      } else {
        errors.serial_number = "";
      }
    } else if (type == "repair_number") {
      //serial_number validation
      if (!form_data_repair.repair_number.trim()) {
        errors.repair_number = "Repair number is required";
      } else {
        errors.repair_number = "";
      }
    } else {
      //first Name validation
      if (!form_data.name) {
        errors.name = "Name is required";
      } else {
        errors.name = "";
      }
      //phone_number validation
      if (!form_data.phone_number) {
        errors.phone_number = "Phone Number is required";
      } else {
        errors.phone_number = "";
      }
      // email validation

      if (!form_data.email) {
        errors.email = "Email is required";
      } else if (
        !form_data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ) {
        errors.email = "Please Enter a valid email address";
      } else {
        errors.email = "";
      }

      if (!props?.macrepairnew) {
        //mac validation
        if (!form_data.mac) {
          errors.mac = "Mac is required";
        } else {
          errors.mac = "";
        }
        //Model validation
        if (!form_data.model) {
          errors.model = "Model is required";
        } else {
          errors.model = "";
        }
        //identifier validation
        if (!form_data.identifier) {
          errors.identifier = "Identifier is required";
        } else {
          errors.identifier = "";
        }
      }
      if (!form_data.selectedIssue) {
        errors.selectedIssue = "Issue is required";
      } else {
        errors.selectedIssue = "";
      }

      //description validation
      if (!form_data.description) {
        errors.description = "Description is required";
      } else {
        errors.description = "";
      }
      setValidation(errors);
    }
  };

  // ===go popup==
  const [show, setShow] = useState(false);

  const [ShowData, setShowData] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  // ===go popup==
  // ===THANKS popup==
  const [showt, setShowt] = useState(false);

  const handleCloset = () => setShowt(false);
  const handleShowt = () => setShowt(true);
  // ===THANKS popup==

  function capitalize(str) {
    let string = str
      ?.replace(/\bimac-pro\b/gi, "iMac-Pro")
      .replace(/\bimac\b/gi, "iMac")
      .replace(/\bmac-pro\b/gi, "Mac-Pro")
      .replace(/\bmacbook\b/gi, "MacBook")
      .replace(/\bmacbook-air\b/gi, "MacBook-Air")
      .replace(/\bmacbook-pro\b/gi, "MacBook-Pro");

    if (string?.toLowerCase().startsWith("imac")) {
      return string;
    }
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  const imgData = {
    imac: "https://www.applefixpros.com/images/mac-repair/Imac/imac_21_4k_2017.jpg",

    "imac-pro":
      "https://www.applefixpros.com/images/mac-repair/Imac-pro/imac_pro_27_2017.jpg",

    "mac-pro":
      "https://www.applefixpros.com/images/mac-repair/Mac-pro/mac_pro_2019.jpg",

    "mac-mini":
      "https://www.applefixpros.com/images/mac-repair/Mac-mini/mac_mini.jpg",

    macbook:
      "https://www.applefixpros.com/images/mac-repair/Macbook/macbook_12_2017.jpg",

    "macbook-air":
      "https://www.applefixpros.com/images/mac-repair/Macbook_air/macbook_air_11_early_2014.jpg",

    "macbook-pro":
      "https://www.applefixpros.com/images/mac-repair/macbook_pro/macbook_pro_13_2tbt3_2016.jpg",
  };

  const routerPath = props?.webUrl?.split("?");
  const canonicalUrl = `https://www.applefixpros.com${routerPath?.[0]}`;

  return (
    <>
      {/* <NextSeo
        title={routerData?.mac}
        description="Apple Fix Pros offers a wide range of fixed-price upgrades and repairs for your Apple computers. You can drop in our office in Citrus Heights or if you are not local, you can either have us collect or send in your computer yourself. Same-day fitting is available for most computers. We fix what Apple won’t. We offer free estimates/diagnoses for all computer jobs. No Repair = No Pay."
        canonical={canonicalUrl}
        openGraph={{
          type: "website",
          url: canonicalUrl,
          title: `${routerData?.mac}`,
          description: `Apple Fix Pros offers a wide range of fixed-price upgrades and repairs for your Apple computers. You can drop in our office in Citrus Heights or if you are not local, you can either have us collect or send in your computer yourself. Same-day fitting is available for most computers. We fix what Apple won’t. We offer free estimates/diagnoses for all computer jobs. No Repair = No Pay.`,
          images: [
            {
              url: `${router?.query ? imgData[router.query?.tags] : ""}`,
              width: 1022,
              height: 600,
              alt: `Apple Fix Pros  | ${routerData?.mac}`,
            },
          ],
        }}
      /> */}

      {isLoading ? <LoaderComp /> : ""}
      <section className='file-repair-main mrt100'>
        <Container>
          <div className='file-repair-full'>
            <div className='main_heading-gradiant-p'>
              <h1>
                Mac <b>Repair</b>
              </h1>
              <p>
                Apple Fix Pros will repair your MacBook Air, MacBook Pro, iMac
                and Mac Mini products.
              </p>
            </div>
            <Row className='justify-content-center cl-4tab'>
              {props?.macrepairnew ? (
                <Col md={6} lg={6} xl={4}>
                  <div className='check_box_main'>
                    <div className='file_box text-center check-status'>
                      <h6>Model configuration</h6>

                      <ul className='mb-4'>
                        {Object.entries(props.ShowData).map(([key, value]) => (
                          <li key={key}>
                            <span className='response-title'>
                              <b>{key} : </b>
                            </span>
                            <span className='response-value'>{value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Col>
              ) : (
                ""
              )}

              <Col md={6} lg={6} xl={4}>
                <div className='file_box_main'>
                  <div className='file_box text-center'>
                    <h6>File a Repair</h6>
                    <p>
                      Use this form below to file a repair with us. We will get
                      back to you with an estimate and repair number.
                    </p>
                  </div>
                  {props?.macrepairnew ? (
                    ""
                  ) : (
                    <>
                      <p>
                        <b>Type: </b>
                        {capitalize(router.query?.tags)}
                      </p>
                      <p>
                        <b>Size: </b>
                        {capitalize(routerData.size)}
                      </p>
                      <p>
                        <b>Mac: </b>
                        {capitalize(routerData.mac)}
                      </p>
                      <p>
                        <b>Model: </b>
                        {capitalize(routerData.model)}
                      </p>
                    </>
                  )}

                  <div className='repair-form-multi'>
                    {/* <MultiForm UpdateMakeSerial={UpdateMakeSerial} /> */}

                    <div className='repair-form'>
                      <Form
                        onSubmit={(e) => handleSubmit(e, "file_repair")}
                        className={isSubmitForm ? "mb-3 d-none" : "mb-3"}
                      >
                        <Row className='mb-3'>
                          <Col md={6}>
                            <Form.Group className='' controlId='formGridName'>
                              <Form.Control
                                type='text'
                                placeholder='Name'
                                name='name'
                                onChange={(e) => handleChange(e)}
                                value={capitalize(form_data.name)}
                                className={validation.name ? "has-error " : ""}
                                // required
                              />
                            </Form.Group>
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
                                value={form_data.phone_number_format}
                                className={
                                  validation.phone_number ? "has-error" : ""
                                }
                                // onKeyDown={enforceFormat}
                                // onKeyUp={formatToPhone}
                                maxLength='16'
                                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                // required
                              />
                            </Form.Group>
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
                                value={form_data.email}
                                className={validation.email ? "has-error" : ""}
                                // required
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        {!props?.macrepairnew && (
                          <Row className='mb-3'>
                            <Col md={12}>
                              <Form.Group as={Col} controlId='formGridEmail'>
                                <Form.Control
                                  type='text'
                                  placeholder='Mac'
                                  name='mac'
                                  // onChange={e => handleChange(e)}
                                  value={capitalize(form_data.mac)}
                                  className={
                                    validation.mac
                                      ? "not-allowed has-error "
                                      : "not-allowed "
                                  }
                                  disabled
                                  // required
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        )}

                        {!props?.macrepairnew && (
                          <>
                            <Row className='mb-3'>
                              <Col md={12}>
                                <Form.Group as={Col} controlId='formGridEmail'>
                                  <Form.Control
                                    type='text'
                                    placeholder='Model'
                                    name='model'
                                    // onChange={e => handleChange(e)}
                                    value={capitalize(form_data.model)}
                                    className={
                                      validation.model
                                        ? "not-allowed has-error "
                                        : "not-allowed "
                                    }
                                    disabled
                                    // required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className='mb-3'>
                              <Col md={12}>
                                <Form.Group as={Col} controlId='formGridEmail'>
                                  <Form.Control
                                    type='text'
                                    placeholder='identifier'
                                    name='identifier'
                                    // onChange={e => handleChange(e)}
                                    value={capitalize(form_data.identifier)}
                                    className={
                                      validation.identifier
                                        ? "not-allowed has-error "
                                        : "not-allowed "
                                    }
                                    disabled
                                    // required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        )}

                        <Row className='mb-3'>
                          <Col md={12}>
                            <div>
                              <select
                                placeholder='Service/Issue'
                                value={selectedIssue}
                                className={
                                  validation.serviceIssue
                                    ? "has-error service-small"
                                    : "service-small"
                                }
                                // className="service-small"
                                // required
                                name='serviceIssue'
                                onChange={(e) => {
                                  setSelectedIssue(e.target.value);
                                  handleChange(e);
                                }}
                              >
                                <option className='service-small' value={""}>
                                  Select Service/Issue
                                </option>
                                {availableIssues?.map((val, key) => {
                                  return (
                                    <option value={val} key={key}>
                                      {val}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col md={12}>
                            <Form.Group
                              className='mb-3'
                              controlId='formGridAddress1'
                            >
                              <Form.Control
                                as='textarea'
                                placeholder='Describe your issue'
                                name='description'
                                onChange={(e) => handleChange(e)}
                                value={capitalize(form_data.description)}
                                className={
                                  validation.description ? "has-error " : ""
                                }
                                // required
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
                              >
                                Submit
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                      <Row className={isSubmitForm ? "mb-3" : "mb-3 d-none"}>
                        <Col md={12}>
                          <div className='tspopup-main text-center'>
                            <h2>Thank You!</h2>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Accumsan, ridiculus pulvinar sed sed feugiat
                              rhoncus.
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
              {/* ======FILE CONTENT COLUMN END======= */}

              {/* ======CHECK STATUS COLUMN END======= */}
            </Row>
          </div>
        </Container>
      </section>

      {/* ======MODEL START====== */}

      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
        className='status-model'
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className='repair-popup-box'>
            <h6>Enter Repair Number</h6>
            <div className='repair-form repair-from-popup'>
              <Form onSubmit={(e) => handleSubmit(e, "repair_number")}>
                <Row className='mb-3 justify-content-center'>
                  <Col md={7}>
                    <Form.Group className='' controlId='formGridSnumber'>
                      <Form.Control
                        type='text'
                        placeholder='Enter Repair Status Code'
                        name='repair_number'
                        onChange={(e) => handleChangeRepair(e)}
                        value={form_data_repair.repair_number}
                        className={validation.repair_number ? "has-error" : ""}
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
                      >
                        Get status
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className={isLoadingRepair ? "" : "d-none"}>
              <h5 className='text-center mt-5 mb-5 repstatus skeleton'></h5>
            </div>
            {RepairStatus != "" && RepairStatus != undefined ? (
              <div className={isLoadingRepair ? "d-none" : ""}>
                <h5 className='text-center mt-5 mb-5 repstatus'>
                  <span>Repair Status:</span> {RepairStatus}
                </h5>
              </div>
            ) : (
              ""
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* ======MODEL START====== */}

      {/* ======MODAL THANKS START=== */}
      <Modal
        show={showt}
        onHide={handleCloset}
        animation={false}
        className='ts-full'
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Thank You</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className='tspopup-main'>
            <h2> If Your Mac Turns On </h2>
            <p>
              If your Mac is working properly, finding the serial number is
              easy. Just click the Apple menu icon at the top of the screen and
              select “About This Mac”. You’ll see the serial number displayed
              along with your Mac’s model number, hardware specifications, and
              the version of macOS you have installed
            </p>
            <h2>If Your Mac Won’t Turn On</h2>
            <p>
              Your Mac’s serial number is printed somewhere on the Mac itself,
              so you’ll be able to find it if you can’t turn your Mac on. Flip
              over a MacBook and you’ll see the serial number and model number
              printed on the Mac itself, near the “Designed by Apple in
              California” text. On a Mac Mini, you’ll find the serial number on
              the bottom. On the Mac Pro, you’ll find it on the back panel.
            </p>
          </div>
        </Modal.Body>
      </Modal>
      {/* =======MODAL THANKS END====== */}
      <Toaster position='top-center' reverseOrder={false} />
    </>
  );
}
// =======BANNER END========
