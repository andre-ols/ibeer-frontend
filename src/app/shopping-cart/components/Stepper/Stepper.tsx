import { FC } from "react";

type Step = {
  label: string;
  isActive: boolean;
  isDisabled: boolean;
};

export const Stepper: FC<{
  steps: Step[];
  onStepClick: (step: Step) => void;
}> = ({ steps, onStepClick }) => {
  return (
    <div className="flex items-center justify-center p-1 w-full bg-gray-800 rounded-md">
      {steps.map((step) => (
        <button
          key={step.label}
          className={`p-2 rounded-md w-full text-white bg-gray-800 text-xs font-bold hover:text-white ${
            step.isActive ? "bg-gray-900" : ""
          } ${step.isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => onStepClick(step)}
          disabled={step.isDisabled}
        >
          {step.label}
        </button>
      ))}
    </div>
  );
};
