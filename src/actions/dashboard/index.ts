"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export const getUserClients = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const clients = await client.customer.count({
        where: {
          Domain: {
            User: {
              clerkId: user.id,
            },
          },
        },
      });
      if (clients) {
        return clients;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserPlanInfo = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const plan = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          _count: {
            select: {
              domains: true,
            },
          },
        },
      });
      if (plan) {
        return {
          plan: "ULTIMATE",
          credits: Number.POSITIVE_INFINITY, // Unlimited credits
          domains: plan._count.domains,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserTotalProductPrices = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const products = await client.product.findMany({
        where: {
          Domain: {
            User: {
              clerkId: user.id,
            },
          },
        },
        select: {
          price: true,
        },
      });

      if (products) {
        const total = products.reduce((total, next) => {
          return total + next.price;
        }, 0);

        return total;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
