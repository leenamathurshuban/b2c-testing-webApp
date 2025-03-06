import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Modal, Button, Form, Card } from "react-bootstrap";
import Image from "next/image";
import CheckImage from "../../../public/assets/images/mac-repair/check-setting.png";
import MultiForm from "./multifrom";
import toast, { Toaster } from "react-hot-toast";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
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
import Sellmfrom from "../sell-your-mac/sellmfrom";
import RepairFormComp from "./repair_form";
import { useRouter } from "next/router";
import { setChildCollectionData, setActive, setActiveTab } from "@/appRedux/counterReducer";

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

export default function LookupForm({ sendDataToParent, setParentActive, oldDataSerial, setShowProducts, setChildCategoryID, collection }) {
  const router = useRouter();

  const handleClick = (e, val,s_no) => {
    sendDataToParent(e, val,s_no);
  };

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
    serviceIssue: "",
    description: "",
  });
  const [validation, setValidation] = useState({
    serial_number: "",
    repair_number: "",
    name: "",
    phone_number: "",
    email: "",
    mac: "",
    model: "",
    serviceIssue: "",
    description: "",
  });
  const [RepairStatus, setRepairStatus] = useState("");
  const [showText, setShowText] = useState(false);
  const [SellState, setSellState] = useState("");
  const [show, setShow] = useState(false);
  const [ShowData, setShowData] = useState({});
  const dispatch = useDispatch();

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

  const handleSeialNumber = (e,data,sn) => {
    setShow(false);
    // setSellState(e);
    handleClick(e, data,sn);
  };

  const handleSubmit = async (e, type = "") => {
    e.preventDefault();
    setIsLoading(true)
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
      // handleShow();
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
        setShowData(JSON.parse(last_serial_data));
        setIsLoadingSerial(false);
        // if (form_data_serial.serial_number.length >= 12) {
        //   handleShow()
        // } else {
        //   setShowText(true)
        //   if (router.pathname == "/mac-repair") {
        //     router.push({
        //       pathname: "mac-parts",
        //       query: JSON.parse(last_serial_data)
        //     }, '/mac-parts')
        //   }
        // }
        setShowText(true)
        if (router.pathname == "/mac-repair") {
          router.push({
            pathname: "mac-parts",
            query: JSON.parse(last_serial_data)
          }, '/mac-parts')
        }
        if(router.pathname == "/sell-your-mac"){
          handleSeialNumber("sell",JSON.parse(last_serial_data),form_data_serial.serial_number)
        }
        collection?.map((val) => {
          if (JSON.parse(last_serial_data)?.Model?.includes(val?.name)) {
            dispatch(setActiveTab(val?.name))
          }
        })
      } else {
        setIsLoadingSerial(true);
        if (router.pathname === '/mac-parts') {
          setShowProducts(false);
        }
        window.localStorage.removeItem("mac-part-collection-child")
        let baseUrl;
        if(form_data_serial.serial_number.length >10){
          baseUrl = `https://shop.applefixpros.com/wp-json/custom-woo/v1/searchbymodal/${form_data_serial.serial_number}`;
        }else{
          baseUrl = `https://shop.applefixpros.com/wp-json/custom-woo/v1/external/${form_data_serial.serial_number}`;
        }
        await axios
          .get(
            // `https://shop.applefixpros.com/wp-json/custom-woo/v1/external/${form_data_serial.serial_number}`
            baseUrl
          )
          .then((res) => {
            if (res?.data?.response) {
              if(res?.data?.response?.thumbnailUrl){
                delete res.data.response.thumbnailUrl
                delete res.data.response.specUrl
              }
              window.localStorage.setItem(
                "api_last_serial_response",
                JSON.stringify(res?.data?.response)
              );
              window.localStorage.setItem(
                "api_last_serial_number",
                form_data_serial.serial_number
              );
              // if (form_data_serial.serial_number.length >= 12) {
              //   handleShow()
              // } else {
              //   setShowText(true)
              // }
              setShowText(true)
              if (router.pathname == "/mac-repair") {
                router.push({
                  pathname: "mac-parts",
                  query: res?.data?.response
                }, '/mac-parts')
              }
              if(router.pathname == "/sell-your-mac"){
                handleSeialNumber("sell",res?.data?.response,form_data_serial.serial_number)
              }
              setShowData(res?.data?.response);
              setIsLoading(false)
              setIsLoadingSerial(false);
              collection?.map((val) => {
                if (res?.data?.response?.Model?.includes(val?.name)) {
                  dispatch(setActiveTab(val?.name))
                }
              })
            }
          })
          .catch((error) => {
            setShowData(error?.response?.data?.message);
            setIsLoading(false)
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
          setIsLoading(false)
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
          setIsLoading(false)
          setIsLoadingRepair(false);
        });
    }
    if (type == "file_repair") {
      if (!form_data.name) {
        errors.name = "Name is required";
        setValidation(errors);
        return false;
      } else {
        errors.name = "";
        setValidation(errors);
      }

      if (!form_data.phone_number) {
        errors.phone_number = "Phone Number is required";
        setValidation(errors);
        return false;
      } else {
        errors.phone_number = "";
        setValidation(errors);
      }

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
        serviceIssue: selectedIssue,
        description: form_data.description,
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
          setIsLoading(false)
          if (res.status == 200) {
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
            router.replace("/ThankYou");
            set_form_data({
              name: "",
              phone_number: "",
              phone_number_format: "",
              email: "",
              mac: "",
              model: "",
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
          setIsLoading(false)
          toast.error("Something went wrong!");
        });

      // setIsSubmitForm(true)
    }
    // console.log(ShowData)
    setIsLoading(false)
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

  const handleClose = () => {
    setShow(false);
    setShowData({});
  };

  const handleShow = () => {
    setShow(true);
  };

  // ===go popup==

  // ===THANKS popup==
  const [showt, setShowt] = useState(false);

  const handleCloset = () => setShowt(false);
  const handleShowt = () => setShowt(true);
  // ===THANKS popup== 

  //Function for redirect to particular product categories
  const handleViewClick = async () => {
    try {
      if (form_data_serial.serial_number.length >= 12) {
        handleFindParts()
      } else {
        let model = ShowData.Model;
        let modelParts = model.split(" ");

        if (
          modelParts.length > 1 &&
          (modelParts[1].startsWith("(") || /\d/.test(modelParts[1]))
        ) {
          model = modelParts[0].toLowerCase();
        } else {
          model = `${modelParts[0]}-${modelParts[1]}`.toLowerCase();
        }
        model = encodeURIComponent(model);
        const url = `https://shop.applefixpros.com/wp-json/custom-woo/v1/pro_cat_part/${model}`;

        const response = await axios.get(url);
        if (response.data && response.data[0]) {
          //setParentActive(response.data[0].parent);
          dispatch(setActive(response.data[0].parent));
          dispatch(
            setChildCollectionData({
              data: response.data,
            })
          );
          // router.push("/mac-parts");
          router.push({
            pathname: "mac-parts",
            query: ShowData
          }, '/mac-parts')
        } else {
          console.error("Unexpected response structure or missing data");
        }
      }
      // let model = ShowData.Model;
      // let modelParts = model.split(" ");

      // if (
      //   modelParts.length > 1 &&
      //   (modelParts[1].startsWith("(") || /\d/.test(modelParts[1]))
      // ) {
      //   model = modelParts[0].toLowerCase();
      // } else {
      //   model = `${modelParts[0]}-${modelParts[1]}`.toLowerCase();
      // }
      // model = encodeURIComponent(model);
      // const url = `https://shop.applefixpros.com/wp-json/custom-woo/v1/pro_cat_part/${model}`;

      // const response = await axios.get(url);
      // if (response.data && response.data[0]) {
      //   //setParentActive(response.data[0].parent);
      //   dispatch(setActive(response.data[0].parent));
      //   dispatch(
      //     setChildCollectionData({
      //       data: response.data,
      //     })
      //   );
      //   // router.push("/mac-parts");
      //   router.push({
      //     pathname: "mac-parts",
      //     query: ShowData
      //   }, '/mac-parts')
      // } else {
      //   console.error("Unexpected response structure or missing data");
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setShow(false);
  };
  const handleFindParts = async () => {
    try {
      if (
        window.localStorage.getItem("mac-part-collection-child") != null &&
        window.localStorage.getItem("api_last_serial_number") ==
        form_data_serial.serial_number
      ) {
        const last_collection_child = window.localStorage.getItem(
          "mac-part-collection-child"
        );
        if (router.pathname == '/mac-repair') {
          router.push({
            pathname: "mac-parts",
            query: { categoryid: JSON.parse(last_collection_child) }
          }, '/mac-parts')
          sessionStorage.setItem("scrollPosition", 500)
        } else {
          sessionStorage.setItem("scrollPosition", 500)
          setShowProducts(true)
          setChildCategoryID(JSON.parse(last_collection_child))
          dispatch(setActive(JSON.parse(last_collection_child)))
          handleClose()
        }
        dispatch(setCategoryName(""))

      } else {
        const url = `https://shop.applefixpros.com/wp-json/custom-woo/v1/searchbymodal/${form_data_serial.serial_number}`
        const response = await axios.get(url);
        if (response?.status == 200) {
          window.localStorage.setItem("mac-part-collection-child", response?.data?.categoryid)
          if (router.pathname == '/mac-repair') {
            router.push({
              pathname: "mac-parts",
              query: { categoryid: response?.data?.categoryid }
            }, '/mac-parts')
            sessionStorage.setItem("scrollPosition", 500)
          } else {
            sessionStorage.setItem("scrollPosition", 500)
            setShowProducts(true)
            setChildCategoryID(response?.data?.categoryid)
            dispatch(setActive(response?.data?.categoryid))
            handleClose()
          }
          dispatch(setCategoryName(""))
        }
      }
      // const url = `https://shop.applefixpros.com/wp-json/custom-woo/v1/searchbymodal/${form_data_serial.serial_number}`
      // const response = await axios.get(url);
      // if (response?.status == 200) {
      //   window.localStorage.setItem("mac-part-collection-child", response?.data?.categoryid)
      //   if (router.pathname == '/mac-repair') {
      //     router.push({
      //       pathname: "mac-parts",
      //       query: { categoryid: response?.data?.categoryid }
      //     }, '/mac-parts')
      //   } else {
      //     setShowProducts(true)
      //     setChildCategoryID(response?.data?.categoryid)
      //     dispatch(setActive(response?.data?.categoryid))
      //     handleClose()
      //   }        
      // }
    } catch (error) {
      // console.log(error)
    }
  }
  useEffect(() => {
    if (router.query) {
      setShowData(router.query)
    }
  }, [router.isReady])
  console.log("=============>",router.query)
  return (
    <>
      {isLoading ? <LoaderComp /> : ""}
      {SellState == "sell" ? (
        <Container>
          <Sellmfrom
            macrepairnew="macrepairnew"
            macrepairstep="2"
            serial_number={form_data_serial.serial_number}
          />
        </Container>
      ) : SellState == "repair" ? (
        <Container>
          <RepairFormComp
            macrepairnew="macrepairnew"
            serial_number={form_data_serial.serial_number}
            ShowData={ShowData}
          />
        </Container>
      ) : (
        <section className="file-repair-main mrt100">
          <Container>
            <div className="file-repair-full">
              <div className="lockno-box">
                <Row className="justify-content-center">
                  <Col md={3}>
                    <div className="lockup-box">
                      <h2>Mac serial lookup</h2>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="repair-form">
                      <Form onSubmit={(e) => handleSubmit(e, "serial_number")}>
                        <Row className="mb-3">
                          <Col md={8}>
                            <Form.Group
                              className=""
                              controlId="formGridSnumber"
                            >
                              <Form.Control
                                type="text"
                                placeholder="Serial Number"
                                name="serial_number"
                                onChange={(e) => handleChangeSerial(e)}
                                value={form_data_serial.serial_number}
                                className={
                                  validation.serial_number ? "has-error" : ""
                                }
                              />
                            </Form.Group>

                            <p className="seriaal-model">
                              Finding Your Serial
                              <span onClick={handleShowt}> click here </span>
                            </p>
                          </Col>
                          <Col md={3}>
                            <div className="repair-btn">
                              <Button
                                type="submit"
                                className="main_btn hvr-shutter-out-horizontal"
                              // onClick={handleShow}
                              >
                                go
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Col>
                </Row>
                {router.pathname === "/mac-parts" && ShowData != [] && showText && <div className="cardbox mb-4">
                  <Row className="justify-content-center">
                    <Col md={12} lg={4} style={{ marginLeft: "105px" }}>
                      <Card border="0">
                        <Card.Body>
                          {/* <Card.Title className="d-flex item-center justify-content-center">
                            Model Configuration
                          </Card.Title> */}
                          <div className="mac-repair-new-sell">
                            <div
                              className={
                                isLoadingSerial ? "d-none gopopup-main" : "gopopup-main pb-3"
                              }
                            >
                              {ShowData === "rejected" ? (
                                <h5>Please enter correct serial number</h5>
                              ) : (
                                <>
                                  <ul className="mb-4">
                                    {Object.entries(ShowData).map(([key, value]) => (
                                      <li key={key}>
                                        <span className="response-title">
                                          <b>{key} : </b>
                                        </span>
                                        <span className="response-value">{value}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>}

                {/*==============================  redirect by mac-repair page======================================================================== */}
                {router.pathname === "/mac-parts" && ShowData != [] && Object.keys(router.query).length != 0 && <div className="cardbox mb-4">
                  <Row className="justify-content-center">
                    <Col md={12} lg={4} style={{ marginLeft: "105px" }}>
                      <Card border="0">
                        <Card.Body>
                          {/* <Card.Title className="d-flex item-center justify-content-center">
                            Model Configuration
                          </Card.Title> */}
                          <div className="mac-repair-new-sell">
                            <div
                              className={
                                isLoadingSerial ? "d-none gopopup-main" : "gopopup-main pb-3"
                              }
                            >
                              {ShowData === "rejected" ? (
                                <h5>Please enter correct serial number</h5>
                              ) : (
                                <>
                                  <ul className="mb-4">
                                    {Object.entries(ShowData).map(([key, value]) => (
                                      <li key={key}>
                                        <span className="response-title">
                                          <b>{key} : </b>
                                        </span>
                                        <span className="response-value">{value}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>}
                {/*==============================end  redirect by mac-repair page======================================================================== */}

                {router.pathname === "/mac-parts" && Object.keys(oldDataSerial).length != 0 && showText && <div className="cardbox mb-4">
                  <Row className="justify-content-center">
                    <Col md={12} lg={4} style={{ marginLeft: "105px" }}>
                      <Card border="0">
                        <Card.Body>
                          {/* <Card.Title className="d-flex item-center justify-content-center">
                            Model Configuration
                          </Card.Title> */}
                          <div className="mac-repair-new-sell">
                            <div
                              className={
                                isLoadingSerial ? "d-none gopopup-main" : "gopopup-main pb-3"
                              }
                            >
                              {ShowData === "rejected" ? (
                                <h5>Please enter correct serial number</h5>
                              ) : (
                                <>
                                  <ul className="mb-4">
                                    {Object.entries(oldDataSerial).map(([key, value]) => (
                                      <li key={key}>
                                        <span className="response-title">
                                          <b>{key} : </b>
                                        </span>
                                        <span className="response-value">{value}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>}

              </div>
            </div>
          </Container>
        </section>
      )}
      {/* ======MODEL START====== */}

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="status-model"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="repair-popup-box">
            <h6>Enter Repair Number</h6>
            <div className="repair-form repair-from-popup">
              <Form onSubmit={(e) => handleSubmit(e, "repair_number")}>
                <Row className="mb-3 justify-content-center">
                  <Col md={7}>
                    <Form.Group className="" controlId="formGridSnumber">
                      <Form.Control
                        type="text"
                        placeholder="Enter Repair Status Code"
                        name="repair_number"
                        onChange={(e) => handleChangeRepair(e)}
                        value={form_data_repair.repair_number}
                        className={validation.repair_number ? "has-error" : ""}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <div className="repair-btn">
                      <Button
                        type="submit"
                        className="main_btn hvr-shutter-out-horizontal"
                      >
                        Get status
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className={isLoadingRepair ? "" : "d-none"}>
              <h5 className="text-center mt-5 mb-5 repstatus skeleton"></h5>
            </div>
            {RepairStatus != "" && RepairStatus != undefined ? (
              <div className={isLoadingRepair ? "d-none" : ""}>
                <h5 className="text-center mt-5 mb-5 repstatus">
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

      {/* ======MODAL GO START=== */}
      {(router.pathname != "/mac-parts" || router.pathname == '/mac-parts') && <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="gomodel-full"
      >
        <Modal.Header closeButton>
          <Modal.Title>Mac Serial Lookup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={
              isLoadingSerial ? "d-none gopopup-main" : "gopopup-main pb-3"
            }
          >
            {ShowData === "rejected" ? (
              <h5>Please enter correct serial number</h5>
            ) : (
              <>
                <ul className="mb-4">
                  {Object.entries(ShowData).map(([key, value]) => (
                    <li key={key}>
                      <span className="response-title">
                        <b>{key} : </b>
                      </span>
                      <span className="response-value">{value}</span>
                    </li>
                  ))}
                </ul>

                {/* condition based button rendering  */}
                <Row className="justify-content-evenly">
                  {router.pathname === "/sell-your-mac" && (
                    <Col md={3} sm={6}>
                      <div className="repair-btn">
                        <Button
                          type="button"
                          className="main_btn hvr-shutter-out-horizontal"
                          onClick={() => handleSeialNumber("sell",{})}
                        >
                          Sell
                        </Button>
                      </div>
                    </Col>
                  )}
                  {router.pathname === "/mac-repair" && (
                    <>
                      <Col md={4} sm={6}>
                        <div className="repair-btn">
                          <Button
                            type="button"
                            className="main_btn hvr-shutter-out-horizontal"
                            onClick={() => handleSeialNumber("repair")}
                          >
                            Repair
                          </Button>
                        </div>
                      </Col>
                      <Col md={4} sm={6}>
                        <div className="repair-btn">
                          <Button
                            type="button"
                            className="main_btn hvr-shutter-out-horizontal"
                            onClick={handleViewClick}
                          >
                            Shop Parts
                          </Button>
                        </div>
                      </Col>
                    </>
                  )}
                  {router.pathname === "/mac-parts" && (
                    <Col md={3} sm={6}>
                      <div className="repair-btn">
                        <Button
                          type="button"
                          className="main_btn hvr-shutter-out-horizontal"
                          onClick={handleFindParts}
                        >
                          Find Parts
                        </Button>
                      </div>
                    </Col>
                  )}
                </Row>

                {/* <Row className='justify-content-evenly'>
                  <Col md={3} sm={6}>
                    <div className='repair-btn'>
                      <Button
                        type='button'
                        className='main_btn hvr-shutter-out-horizontal'
                        onClick={(e) => handleSeialNumber("sell")}
                      >
                        Sell
                      </Button>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className='repair-btn'>
                      <Button
                        type='button'
                        className='main_btn hvr-shutter-out-horizontal'
                        onClick={(e) => handleSeialNumber("repair")}
                      >
                        Repair
                      </Button>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className='repair-btn'>                   
                      <Button
                        type='button'
                        className='main_btn hvr-shutter-out-horizontal'
                        onClick={handleViewClick}
                      >
                      Find Part 
                      </Button>
                    </div>
                  </Col>
                </Row> */}
              </>
            )}
          </div>

          <div
            className={
              isLoadingSerial ? "gopopup-main" : "gopopup-main d-none "
            }
          >
            <div
              className="skeleton mt-2 mb-4"
              style={{ height: "150px" }}
            ></div>
            <div className="skeleton mt-2 mb-2"></div>
            <div className="skeleton mt-2 mb-2"></div>
            <div className="skeleton mt-2 mb-2"></div>
            <div className="skeleton mt-2 mb-2"></div>
            <div className="skeleton mt-2 mb-2"></div>
          </div>
        </Modal.Body>
      </Modal>}
      {/* =======MODAL GO END====== */}

      {/* ======MODAL THANKS START=== */}
      <Modal
        show={showt}
        onHide={handleCloset}
        animation={false}
        className="ts-full"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Thank You</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="tspopup-main">
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
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
// =======BANNER END========
