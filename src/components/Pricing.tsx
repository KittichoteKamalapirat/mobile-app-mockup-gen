import React from "react";
import Button from "./Buttons/Button";

interface Props {}

const title = "Mockups made easy";
const subTitle = "Create beautiful mockups for your mobile apps";

interface Plan {
  name: string;
  description: string;
  price: number;
  features: string[];
}

const plans: Plan[] = [
  {
    name: "Free",
    description:
      "Best option for personal use that does not require much customization",
    price: 0,
    features: ["10 free mockups/month"],
  },
  {
    name: "Premium",
    description: "Best if you need unlimited mockups and customization",
    price: 0.99,
    features: [
      "Unlimited mockups",
      "Customization such as background color and transparent background",
    ],
  },
];

const Pricing = ({}: Props) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            {subTitle}
          </p>
        </div>
        {/* Pricing Card */}
        <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex  flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
            >
              <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                {plan.description}
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                  ${plan.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              {/* List */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                {plan.features.map((feature) => (
                  <li className="flex items-center space-x-3" key={feature}>
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button label="Get started" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Pricing;
