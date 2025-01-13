"use client";
import React from "react";

const SubscriptionForm = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">All Features Included</h2>
        <p className="text-gray-600 mt-2">
          You have full access to all SmartRep AI features:
        </p>
        <ul className="mt-4 text-left list-disc pl-6">
          <li>Unlimited domains</li>
          <li>Unlimited contacts</li>
          <li>Unlimited emails per month</li>
          <li>All premium features</li>
          <li>Priority support</li>
          <li>Advanced analytics</li>
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionForm;
