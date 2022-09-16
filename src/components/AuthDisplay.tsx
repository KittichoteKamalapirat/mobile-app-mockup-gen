import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "../../functions/src/stripe/createCheckoutSession";
import usePremiumStatus from "../../functions/src/stripe/usePremiumStatus";
import { auth, logout } from "../firebase/client";
import Button, { ButtonTypes } from "./Buttons/Button";
import Dropdown from "./Dropdown";
import Login from "./Login";
import Tag from "./Tag";

import { BsFillCaretDownFill } from "react-icons/bs";

interface Props {}

const AuthDisplay = ({}: Props) => {
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // loading
  if (!user && userLoading) return <h1>Loading...</h1>;

  // no user
  if (!user && !userLoading) return <Login />;

  return (
    <div>
      {user && !userLoading && (
        <div>
          <Dropdown
            isOpen={modalIsOpen}
            onClick={() => setModalIsOpen(!modalIsOpen)}
            items={[
              {
                label: "Log out",
                itemOnClick: () => logout(),
              },
              {
                label: "Pricing",
                href: "/pricing",
              },
              {
                label: "Account",
                href: "/account",
              },
            ]}
          >
            <h1 className="text-md">Hi, {user.displayName?.split(" ")[0]}</h1>
            <BsFillCaretDownFill />
          </Dropdown>

          {!userIsPremium ? (
            <Button
              type={ButtonTypes.ACTION}
              label="Upgrade to premium"
              onClick={() => createCheckoutSession(user.uid)}
            />
          ) : (
            <Tag content="🍪 Premium" />
          )}
        </div>
      )}
    </div>
  );
};
export default AuthDisplay;
