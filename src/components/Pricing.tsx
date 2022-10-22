import { User } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, openCustomerPortal } from "../firebase/client";
import usePremiumStatus from "../hooks/usePremiumStatus";
import { createCheckoutSession } from "../stripe/createCheckoutSession";
import Button from "./Buttons/Button";
import LoginModal from "./LoginModal";

interface Props {}

const title = "Mockups made easy";
const subTitle = "Create beautiful mockups for your mobile apps";

interface Plan {
  name: string;
  description: string;
  price: number;
  features: string[];
  action: () => void;
  actionLabel: string;
}

const Pricing = ({}: Props) => {
  const [freeButtonIsLoading, setFreeButtonIsLoading] = useState(false);
  const [premiumButtonIsLoading, setPremiumButtonIsLoading] = useState(false);
  const [user] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user as User);

  // login modal
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const plans: Plan[] = [
    {
      name: "Free",
      description:
        "Best option for personal use that does not require much customization",
      price: 0,
      features: ["10 free mockups/month"],
      actionLabel: (() => {
        if (!user) return "Sign in and Get started";
        if (!userIsPremium) return "Current plan";
        return "Switch to this plan";
      })(),
      action: async () => {
        if (!user) return toggleModal();
        // already free user so do nothing
        if (!userIsPremium) return;
        // premium want to cancel subscription

        setFreeButtonIsLoading(true);
        await openCustomerPortal();
        setFreeButtonIsLoading(false);
      },
    },
    {
      name: "Premium",
      description: "Best if you need unlimited mockups and customization",
      price: 0.99,
      features: [
        "Unlimited mockups",
        "Customization such as background color and transparent background",
      ],
      actionLabel: (() => {
        if (!user) return "Sign in and Get started";
        if (!userIsPremium) return "Get started";
        return "Current plan";
      })(),
      action: async () => {
        if (!user) return toggleModal();
        // free user wants to subscribe
        if (!userIsPremium) {
          setPremiumButtonIsLoading(true);
          await createCheckoutSession(user.uid);
          setPremiumButtonIsLoading(false);
          return;
        }
        // already premium so do nothing
        return;
      },
    },
  ];

  return (
    <section className="bg-white ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
            {title}
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl ">
            {subTitle}
          </p>
        </div>
        {/* Pricing Card */}
        <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex  flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow  xl:p-8 "
            >
              <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
              <p className="font-light text-gray-500 sm:text-lg ">
                {plan.description}
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                  ${plan.price}
                </span>
                <span className="text-gray-500 ">/month</span>
              </div>
              {/* List */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                {plan.features.map((feature) => (
                  <li className="flex items-center space-x-3" key={feature}>
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                label={plan.actionLabel}
                onClick={plan.action}
                loading={
                  (plan.name === "Premium" && premiumButtonIsLoading) ||
                  (plan.name === "Free" && freeButtonIsLoading)
                }
              />
            </div>
          ))}
        </div>
      </div>
      <LoginModal isOpen={modalIsOpen} toggleModal={toggleModal} />
    </section>
  );
};
export default Pricing;
