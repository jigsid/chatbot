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
    <div className="bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-emerald-500 h-5 w-5" />
          <span className="text-gray-700 dark:text-gray-300">Unlimited Email Credits</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-emerald-500 h-5 w-5" />
          <span className="text-gray-700 dark:text-gray-300">
            Unlimited Domains (Current: {domains})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-emerald-500 h-5 w-5" />
          <span className="text-gray-700 dark:text-gray-300">
            Unlimited Contacts (Current: {clients})
          </span>
        </div>
      </div>
    </div>
  );
};
