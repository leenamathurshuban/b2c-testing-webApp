import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import LocationInfo from "./LocationInfo";

const MultiForm = ({ UpdateMakeSerial }) => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone_number: "",
    city: "",
    state: "",
  });
  

  const [step, setStep] = useState(1);

  const nextStep = () => {
    UpdateMakeSerial();
    if (step < 2) {
      setStep(step + 1);
    } else if (step === 2) {
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  
  return (
    <div className="">
      <div className="">
        <div className="mt-5">
          {
            {
              1: <PersonalInfo handleChange={handleChange} />,
              // 2: <LocationInfo handleChange={handleChange} />,
            }[step]
          }
          <div className="d-flex justify-content-around px-5">
            {/* {step > 1 ? (
              <button className="btn btn-warning" onClick={prevStep}>
                Back
              </button>
            ) : null} */}
            <div className="repair-btn">
              <button
                className="main_btn hvr-shutter-out-horizontal"
                onClick={nextStep}
              >
                {step === 2 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiForm;
