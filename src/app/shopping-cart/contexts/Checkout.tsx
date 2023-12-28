"use client";
import { FC, PropsWithChildren, createContext, useState } from "react";

type Step = {
  label: "Detalhes" | "Pagamento";
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
  checkout: (paymentInfo: PaymentInfo) => void;
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
  ]);

  const paymentStepIsActive = steps.find(
    (step) => step.label === "Pagamento"
  )?.isActive;

  const detailsStepIsActive = steps.find(
    (step) => step.label === "Detalhes"
  )?.isActive;

  const checkout = async (paymentInfo: PaymentInfo) => {};

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
        checkout,
      }}
    >
      {children}
    </checkoutContext.Provider>
  );
};
