"use client";
import { FC, useContext } from "react";
import "react-credit-cards/es/styles-compiled.css";
import { checkoutContext } from "../../contexts/Checkout";
import { OrderDetails } from "../OrderDetails";
import { Payment } from "../Payment";
import { Stepper } from "../Stepper/Stepper";

export const Checkout: FC = () => {
  const { steps, paymentStepIsActive, detailsStepIsActive, setSteps } =
    useContext(checkoutContext);

  return (
    <div>
      <div className="flex flex-col min-w-[330px] justify-between rounded-3xl items-center bg-gray-900 gap-2 p-3 sticky top-28">
        <Stepper
          steps={steps}
          onStepClick={(step) => {
            const newSteps = steps.map((s) => ({
              ...s,
              isActive: s.label === step.label,
            }));
            setSteps(newSteps);
          }}
        />

        {paymentStepIsActive && <Payment />}
        {detailsStepIsActive && <OrderDetails />}
      </div>
    </div>
  );
};
