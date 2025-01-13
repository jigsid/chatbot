import React from "react";
import Section from "../section-label";
import { CheckCircle2 } from "lucide-react";

const BillingSettings = () => {
  const features = [
    "Unlimited domains",
    "Unlimited contacts",
    "Unlimited emails per month",
    "All premium features",
    "Priority support",
    "Advanced analytics",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Features"
          message="You have full access to all SmartRep AI features."
        />
      </div>
      <div className="lg:col-span-1">
        <h3 className="text-xl font-semibold mb-4">Included Features</h3>
        <div className="flex gap-2 flex-col">
          {features.map((feature) => (
            <div key={feature} className="flex gap-2 items-center">
              <CheckCircle2 className="text-green-500 h-5 w-5" />
              <p className="text-gray-700">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
