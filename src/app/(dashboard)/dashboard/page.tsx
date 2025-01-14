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
      <div className="overflow-y-auto w-full flex-1 h-0 px-2 sm:px-2">
        <div className="flex flex-wrap gap-5">
          <DashboardCard
            value={clients || 0}
            title="Potential Clients"
            icon={<PersonIcon />}
          />
          <DashboardCard
            value={products! * clients! || 0}
            sales
            title="Pipeline Value"
            icon={<DollarSign />}
          />
          <DashboardCard
            value={bookings || 0}
            title="Appointments"
            icon={<CalIcon />}
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10 gap-10">
          <div>
            <div className="mb-5">
              <h2 className="font-bold text-2xl">Plan Usage</h2>
              <p className="text-sm font-light">
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
      </div>
    </>
  );
};

export default Page;
