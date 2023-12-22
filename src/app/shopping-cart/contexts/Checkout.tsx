"use client";
import { FC, PropsWithChildren, createContext, useState } from "react";

type Step = {
  label: "Detalhes" | "Pagamento" | "Confirmação";
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
  goToStep: (step: Step["label"]) => void;
  paymentStepIsActive: boolean | undefined;
  detailsStepIsActive: boolean | undefined;
  paymentInfo: PaymentInfo;
  setPaymentInfoHandler: (paymentInfo: PaymentInfo) => void;
};

export const checkoutContext = createContext<CheckoutContext>(
  {} as CheckoutContext
);

export const CheckoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [steps, setSteps] = useState<Step[]>([
    {
      label: "Detalhes",
      isActive: true,
      isDisabled: false,
    },
    {
      label: "Pagamento",
      isActive: false,
      isDisabled: true,
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
    goToStep(confirmStep!.label);
  };

  const goToStep = (label: Step["label"]) => {
    steps.map((step) => ((step.isActive = false), (step.isDisabled = true)));
    const stepIndex = steps.findIndex((s) => s.label === label);
    steps[stepIndex] = {
      ...steps[stepIndex],
      isActive: true,
      isDisabled: false,
    };
    setSteps([...steps]);
  };

  return (
    <checkoutContext.Provider
      value={{
        steps,
        goToStep,
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
