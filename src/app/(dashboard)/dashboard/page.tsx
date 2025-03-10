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
import { ChevronUp, DollarSign, LineChart } from "lucide-react";
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
      <div className="overflow-y-auto w-full flex-1 h-0 p-6 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        {/* Features Section */}
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800/50">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Dashboard Features</h3>
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-blue-700 dark:text-blue-400">
            <span className="bg-white dark:bg-blue-800/30 px-2 py-1 rounded">Analytics Overview</span>
            <span className="bg-white dark:bg-blue-800/30 px-2 py-1 rounded">Performance Metrics</span>
            <span className="bg-white dark:bg-blue-800/30 px-2 py-1 rounded">Pipeline Value</span>
            <span className="bg-white dark:bg-blue-800/30 px-2 py-1 rounded">Plan Usage</span>
            <span className="bg-white dark:bg-blue-800/30 px-2 py-1 rounded">Activity Tracking</span>
          </div>
        </div>
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to your Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's an overview of your business metrics and activity
          </p>
        </div>
        
        {/* Key Metrics */}
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
        
        {/* Analytics Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <LineChart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                Performance Analytics
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Key metrics over the last 30 days
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm h-64 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">Analytics visualization coming soon</p>
            </div>
          </div>
          
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Plan Usage
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A detailed overview of your current plan
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
        
        {/* Recent Activity Section */}
        <div className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ChevronUp className="w-5 h-5 text-emerald-500" /> 
              Recent Activity
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your latest interactions and updates
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-800/50 rounded-xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm">
            <div className="space-y-4">
              {/* Activity items would go here */}
              <div className="text-gray-500 dark:text-gray-400 text-sm italic text-center py-4">
                No recent activity to display
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
