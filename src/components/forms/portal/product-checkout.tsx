import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

type Props = {
  products?: {
    name: string;
    image: string;
    price: number;
  }[];
  amount?: number;
  stripeId?: string;
  onNext(): void;
  onBack(): void;
};

const PaymentCheckout: React.FC<Props> = ({
  products,
  amount,
  stripeId,
  onNext,
  onBack,
}) => {
  const stripePromise = stripeId ? loadStripe(stripeId) : null;

  if (!products || !amount || !stripeId) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            <div className="relative w-16 h-16">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {stripePromise && (
        <Elements stripe={stripePromise}>
          <div className="mt-4 space-y-2">
            <button
              onClick={onNext}
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Pay ${amount}
            </button>
            <button
              onClick={onBack}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </Elements>
      )}
    </div>
  );
};

export default PaymentCheckout;
