import React from "react";
import { ProgressBar } from "../progress";
import { CheckCircle2 } from "lucide-react";

type PlanUsageProps = {
  plan: "ULTIMATE";
  credits: number;
  domains: number;
  clients: number;
};

export const PlanUsage = ({ plan, domains, clients }: PlanUsageProps) => {
  return (
    <div className="flex flex-col gap-5 py-5">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="text-green-500 h-5 w-5" />
        <span className="text-gray-700">Unlimited Email Credits</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle2 className="text-green-500 h-5 w-5" />
        <span className="text-gray-700">
          Unlimited Domains (Current: {domains})
        </span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle2 className="text-green-500 h-5 w-5" />
        <span className="text-gray-700">
          Unlimited Contacts (Current: {clients})
        </span>
      </div>
    </div>
  );
};
