"use client";
import { FC, PropsWithChildren, createContext, useState } from "react";

type Step = {
  label: string;
  isActive: boolean;
  isDisabled: boolean;
};

export type PaymentInfo = {
  number: string;
  name: string;
  date: string;
  cvc: string;
};

type CheckoutContext = {
  steps: Step[];
  setSteps: (steps: Step[]) => void;
  paymentStepIsActive: boolean | undefined;
  detailsStepIsActive: boolean | undefined;
  paymentInfo: PaymentInfo;
  setPaymentInfoHandler: (paymentInfo: PaymentInfo) => void;
};

export const checkoutContext = createContext<CheckoutContext>(
  {} as CheckoutContext
);

export const CheckoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [steps, setSteps] = useState([
    {
      label: "Detalhes",
      isActive: true,
      isDisabled: false,
    },
    {
      label: "Pagamento",
      isActive: false,
      isDisabled: false,
    },
    {
      label: "Confirmação",
      isActive: false,
      isDisabled: true,
    },
  ]);

  const paymentStepIsActive = steps.find(
    (step) => step.label === "Pagamento"
  )?.isActive;

  const detailsStepIsActive = steps.find(
    (step) => step.label === "Detalhes"
  )?.isActive;

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    number: "",
    name: "",
    date: "",
    cvc: "",
  });

  const setPaymentInfoHandler = (paymentInfo: PaymentInfo) => {
    setPaymentInfo(paymentInfo);
    const confirmStep = steps.find((step) => step.label === "Confirmação");
    steps.map((step) => (step.isActive = false));

    if (confirmStep) {
      confirmStep.isDisabled = false;
      confirmStep.isActive = true;
    }

    setSteps([...steps]);
  };

  return (
    <checkoutContext.Provider
      value={{
        steps,
        setSteps,
        paymentStepIsActive,
        detailsStepIsActive,
        paymentInfo,
        setPaymentInfoHandler,
      }}
    >
      {children}
    </checkoutContext.Provider>
  );
};
