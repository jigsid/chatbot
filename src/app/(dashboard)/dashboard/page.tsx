import { getUserAppointments } from "@/actions/appointment";
import {
  getUserClients,
  getUserPlanInfo,
  getUserTotalProductPrices,
} from "@/actions/dashboard";
import DashboardCard from "@/components/dashboard/cards";
import { PlanUsage } from "@/components/dashboard/plan-usage";
import InfoBar from "@/components/infobar";
import CalIcon from "@/icons/cal-icon";
import EmailIcon from "@/icons/email-icon";
import PersonIcon from "@/icons/person-icon";
import { DollarSign } from "lucide-react";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const clients = await getUserClients();
  const bookings = await getUserAppointments();
  const plan = await getUserPlanInfo();
  const products = await getUserTotalProductPrices();

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full flex-1 h-0 p-6 bg-gray-50 dark:bg-neutral-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            value={clients || 0}
            title="Potential Clients"
            icon={<PersonIcon />}
          />
          <DashboardCard
            value={products! * clients! || 0}
            sales
            title="Pipeline Value"
            icon={<DollarSign className="w-5 h-5" />}
          />
          <DashboardCard
            value={bookings || 0}
            title="Open Sessions"
            icon={<CalIcon />}
          />
          <DashboardCard
            value={4}
            title="Domain Performance"
            icon={<EmailIcon />}
          />
        </div>
        <div className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Plan Usage</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A detailed overview of your metrics, usage, and customers
            </p>
          </div>
          <PlanUsage
            plan="ULTIMATE"
            credits={Number.POSITIVE_INFINITY}
            domains={plan?.domains || 0}
            clients={clients || 0}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
