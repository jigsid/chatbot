import React from "react";
import { ProgressBar } from "../progress";
import { CheckCircle2, Crown, Globe, Mail, Users } from "lucide-react";

type PlanUsageProps = {
  plan: "ULTIMATE";
  credits: number;
  domains: number;
  clients: number;
};

export const PlanUsage = ({ plan, domains, clients }: PlanUsageProps) => {
  return (
    <div className="bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Ultimate Plan</h3>
        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
          <Crown className="w-3.5 h-3.5" />
          Premium
        </div>
      </div>
      
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3 bg-gray-50 dark:bg-neutral-900/50 p-3 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-neutral-800/70">
          <Mail className="text-blue-500 h-5 w-5 mt-0.5" />
          <div className="flex-1">
            <span className="text-gray-800 dark:text-gray-200 font-medium">Email Credits</span>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-full bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[30%] rounded-full"></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Unlimited</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3 bg-gray-50 dark:bg-neutral-900/50 p-3 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-neutral-800/70">
          <Globe className="text-violet-500 h-5 w-5 mt-0.5" />
          <div className="flex-1">
            <span className="text-gray-800 dark:text-gray-200 font-medium">Domains</span>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-full bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 w-[15%] rounded-full"></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {domains} / Unlimited
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3 bg-gray-50 dark:bg-neutral-900/50 p-3 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-neutral-800/70">
          <Users className="text-emerald-500 h-5 w-5 mt-0.5" />
          <div className="flex-1">
            <span className="text-gray-800 dark:text-gray-200 font-medium">Contacts</span>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-full bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[20%] rounded-full"></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {clients} / Unlimited
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-neutral-800">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium">
          View Billing Details
        </button>
      </div>
    </div>
  );
};
