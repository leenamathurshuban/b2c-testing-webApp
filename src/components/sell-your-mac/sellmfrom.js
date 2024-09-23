import React, { useState, useEffect } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from "axios";

// import PersonalInfo from "./PersonalInfo";
// import LocationInfo from "./LocationInfo";
import Sellfnumber from "./sell_serial_number";
import Sellfstep from "./sell_from_step";
import Sellinfo from "./sell_info";
import Sellcondition from "./sell_condition";
import Sellaccesserise from "./sell_access";
import Sellwcondition from "./sell_wcondition";
import Thankinfo from "./thanks_info";
import { validateEmail, validateNumber } from "../../lib/helpers";
const {
  HTTP_SERVICE_CALL_NO_AUTH,
  HTTP_SERVICE_CALL,
} = require("../../provider/ApiProvider");
import LoaderComp from "../Loader/loader_comp";
import toast, { Toaster } from "react-hot-toast";

const Sellmfrom = (props) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  const [serialNumber, setSerialNumber] = useState(props.serial_number ?? "");
  const [workingCondition, setWorkingCondition] = useState("");
  const [accessoriesValues, setAccessoriesValues] = useState([]);
  const [reasonNotWorkingValues, setReasonNotWorkingValues] = useState([]);
  const [deviceConditionsValues, setDeviceConditionsValues] = useState("");
  const [errors, setError] = useState({
    serialNumber: "",
    accessoriesValues: "",
    reasonNotWorkingValues: "",
    deviceConditionsValues: "",
    name: "",
    email: "",
    phone_number: "",
  });

  const [step, setStep] = useState(props.macrepairstep == '2' ? 2 : 1);

  useEffect(() => {}, [errors]);

  function UpdateState(tstep) {
    setStep(tstep);
  }

  function validationFormStep() {
    setError({
      serialNumber: "",
      accessoriesValues: "",
      reasonNotWorkingValues: "",
      deviceConditionsValues: "",
      name: "",
      email: "",
      phone_number: "",
    });

  }
  const nextStep = async e => {
    // validation
    validationFormStep();
    if (step == 1) {
      setValues({
        name: "",
        email: "",
        phone_number: "",
      });
      setWorkingCondition("");
      setAccessoriesValues([]);
      setReasonNotWorkingValues([]);
      setDeviceConditionsValues("");
    }
    if (step == 1 && serialNumber == "") {
      setError({ ...errors, serialNumber: "Please Enter Serial Number" });
      return false;
    } else if (
      step == 3 &&
      workingCondition == "working" &&
      accessoriesValues.length <= 0
    ) {
      setError({ ...errors, accessoriesValues: "Please Select Accessories" });
      return false;
    } else if (
      step == 3 &&
      workingCondition == "not_working" &&
      reasonNotWorkingValues.length <= 0
    ) {
      setError({ ...errors, reasonNotWorkingValues: "Please Select Reason" });
      return false;
    } else if (
      step == 4 &&
      workingCondition == "working" &&
      deviceConditionsValues.length <= 0
    ) {
      setError({
        ...errors,
        deviceConditionsValues: "Please Select Device Conditions",
      });
      return false;
    } else if (
      (step == 5 && workingCondition == "working") ||
      (step == 4 && workingCondition == "not_working")
    ) {
      var errorForObj = {
        name: "",
        email: "",
        phone_number: "",
      };

      if (values.name == "") {
        errorForObj.name = "Please Enter Name";
      }

      if (values.email == "") {
        errorForObj.email = "Please Enter Email";
      } else if (!validateEmail(values.email)) {
        errorForObj.email = "Please Enter Valid Email";
      }

      if (values.phone_number == "") {
        errorForObj.phone_number = "Please Enter Phone Number";
      } 
      // else if (!validateNumber(values.phone_number)) {
      //   errorForObj.phone_number = "Please Enter Numeric value";
      // }

      setError({
        ...errors,
        name: errorForObj.name,
        email: errorForObj.email,
        phone_number: errorForObj.phone_number,
      });
      if (errorForObj.name || errorForObj.email || errorForObj.phone_number) {
        return false;
      }

      handleSubmitData();
    } else {
      setStep(step + 1);
    }
    // validation End
    // handleSubmitData();
    // if (step == 6 &&  workingCondition =="working" || step == 5 &&  workingCondition =="not_working") {
    //   // setStep(step + 1);
    //   handleSubmitData()
    // } else {
    //   setStep(step + 1);
    // }
  };

  const prevStep = () => {
    validationFormStep();

    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmitData = async () => {    
    if (workingCondition == "working") {
      var assVal = accessoriesValues.map((value, key) => {
        return value.value;
      });

      var formData = {
        serialNumber: serialNumber,
        workingCondition: workingCondition,
        accessoriesValues: assVal,
        deviceConditionsValues: deviceConditionsValues,
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
      };
      var mailTemplate = `<!DOCTYPE html>
      <html>
          <body>
            <div>
              <h1 style="text-align: center;">
                  <a href="#" style=" display: inline-block; color:black;"><span style="">Apple Fix Pros</span></a>
              </h1>
              <p style="text-align: center;">Thank you for connecting with us, we will get back to you soon! </p>
              
              </div>
              <p>Thank you for contacting us, we will get back you soon! </p>
              <table style="font-family: Arial, Helvetica, sans-serif;
              border-collapse: collapse;
              width: 100%;">
              <tr>
                <th style="border: 1px solid #ddd;
              padding: 8px;">Name</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${values.name}</td>
              </tr>               
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Phone Number</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${values.phone_number}</td>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Email Id</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${values.email}</td>
              </tr>
              <tr>               
              <th style="border: 1px solid #ddd;
              padding: 8px;">Serial Number</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${serialNumber}</td>
              </tr>
              <tr>
              <th style="border: 1px solid #ddd;
              padding: 8px;">Working Condition</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${workingCondition}</td>
              </tr>
              <tr>
              <th style="border: 1px solid #ddd;
              padding: 8px;">Accessories</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${assVal.join(" ,")}</td>
              </tr>
              <tr>
              <th style="border: 1px solid #ddd;
              padding: 8px;">Device Conditions</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${deviceConditionsValues}</td>
              </tr>
            </table>
          </body>
      </html>`;
    } else {
      var reasonVal = reasonNotWorkingValues.map((value, key) => {
        return value.value;
      });
      var formData = {
        serialNumber: serialNumber,
        workingCondition: workingCondition,
        reasonNotWorkingValues: reasonVal,
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
      };

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
              padding: 8px;">Name</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${values.name}</td>
              </tr>               
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Phone Number</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${values.phone_number}</td>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd;
                padding: 8px;">Email Id</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${values.email}</td>
              </tr>
              <tr>               
              <th style="border: 1px solid #ddd;
              padding: 8px;">Serial Number</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${serialNumber}</td>
              </tr>
              <tr>
              <th style="border: 1px solid #ddd;
              padding: 8px;">Working Condition</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${workingCondition}</td>
              </tr>
              <tr>
              <th style="border: 1px solid #ddd;
              padding: 8px;">Reason Not Working</th>
                <td style="border: 1px solid #ddd;
                padding: 8px;">${reasonVal.join(" ,")}</td>
              </tr>
            </table>
          </body>
      </html>`;
    }

    // await SellMacWebhook(formData);

    // SENDGRID START
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
        toast.success("Successfully submitted your request. We will get back to you with an offer by email or call or iMessage.",{duration:5000});        
      })
      .catch(err => {
        setIsLoading(false);
        toast.error('Something went wrong!',{duration:5000})
      });
    setIsLoading(false);
    setTimeout(()=>{
      window.location.reload()
    },4000)
    
    // SENDGRID END
  };
  // Mac Sell form webhook
  async function SellMacWebhook(params) {
    setIsLoading(true);
    await axios
      .post(process.env.NEXT_PUBLIC_SellMacWebhook, params)
      .then(res => {
        // setIsLoading(false);
        // setStep(step + 1);
        // setValues({
        //   name: "",
        //   email: "",
        //   phone_number: "",
        // });
        // setWorkingCondition("");
        // setSerialNumber("");
        // setAccessoriesValues([]);
        // setReasonNotWorkingValues([]);
        // setDeviceConditionsValues("");
        // if(workingCondition == "working"){
        //   setStep(6);
        // }else if(workingCondition == "not_working"){
        //     setStep(5);
        // }
      })
      .catch(err => {
        setIsLoading(false);
        // toast.error("Something went wrong!");
      });
  }
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeSelect = (selectedValues, type) => {
    if (type == "sell_accessories") {
      setAccessoriesValues(selectedValues);
    } else if (type == "reasonNotWorking") {
      setReasonNotWorkingValues(selectedValues);
    } else if (type == "device_conditions") {
      setDeviceConditionsValues(selectedValues.target.value);
    }
  };
  const handleInputSrialNumber = event => {
    setSerialNumber(event.target.value);
  };

  const handleWorkingCondition = event => {
    setWorkingCondition(event.target.value);
    setStep(step + 1);
  };

  const workStep = type => {
    if ((type = "work" && step == 1)) {
      setStep(3);
    } else if ((type = "n_work" && step == 1)) {
      setStep(4);
    }
  };

  return (
    <>
      {isLoading ? <LoaderComp /> : ""}
      <Toaster />
      
        <div className="d-flex justify-content-center">
          <div className="mt-5 bkbtn-pos col-lg-6 col-md-12">
            {
              {
                1: (
                  <Sellfnumber
                    handleChange={handleChange}
                    error={errors.serialNumber}
                    serialNumber={serialNumber}
                    handleInput={handleInputSrialNumber}
                  />
                ),
                2: (
                  <Sellwcondition
                    workingCondition={workingCondition}
                    handleChange={handleChange}
                    handleInput={handleWorkingCondition}
                  />
                ),
                3:
                  workingCondition == "working" ? (
                    <Sellaccesserise
                      handleChangeSelect={values =>
                        handleChangeSelect(values, "sell_accessories")
                      }
                      selectedValue={accessoriesValues}
                      error={errors.accessoriesValues}
                    />
                  ) : (
                    <Sellfstep
                      handleChangeSelect={values =>
                        handleChangeSelect(values, "reasonNotWorking")
                      }
                      selectedValue={reasonNotWorkingValues}
                      error={errors.reasonNotWorkingValues}
                    />
                  ),
                4:
                  workingCondition == "working" ? (
                    <Sellcondition
                      handleChange={handleChange}
                      handleChangeSelect={values =>
                        handleChangeSelect(values, "device_conditions")
                      }
                      selectedValue={deviceConditionsValues}
                      error={errors.deviceConditionsValues}
                    />
                  ) : (
                    <Sellinfo
                      handleChange={handleChange}
                      errors={errors}
                      values={values}
                    />
                  ),

                5:
                  workingCondition == "working" ? (
                    <Sellinfo
                      handleChange={handleChange}
                      errors={errors}
                      values={values}
                    />
                  ) : (
                    <Thankinfo handleChange={handleChange} />
                  ),
                6:
                  workingCondition == "working" ? (
                    <Thankinfo handleChange={handleChange} />
                  ) : (
                    ""
                  ),
              }[step]
            }
            {/* <div className="d-flex justify-content-around px-5"> */}
            <div className="d-flex justify-content-end bn-btnbox">
             { step > 1 ? (
                <div className="repair-btn">
            {props.macrepairnew && step == 2 ? "" : 
                  <button
                    className=" hvr-shutter-out-horizontal bkbtn-from"
                    onClick={prevStep}
                  >
                    <FaLongArrowAltLeft />
                  </button>}
                </div>
              ) : null}
              <div className="repair-btn">
                <button
                  className=" hvr-shutter-out-horizontal whenwork"
                  onClick={e => nextStep(e)}
                >
                  {step === 6 ||
                  (step === 5 && workingCondition == "not_working")
                    ? "Submit"
                    : step === 5 && workingCondition == "working"
                    ? "Get Offer"
                    : "Next"}
                  {/* {step === 6 ? "Get Offer" : "Next"} */}
                </button>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Sellmfrom;
