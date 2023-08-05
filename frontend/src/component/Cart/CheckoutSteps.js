import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdLibraryAddCheck } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <FaShippingFast className="icon" />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <MdLibraryAddCheck className="icon" />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdAccountBalance className="icon" />,
    },
  ];

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} className="Stepper">
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#fa8163f6" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
