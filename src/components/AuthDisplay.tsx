import { User } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "../../functions/src/stripe/createCheckoutSession";
import usePremiumStatus from "../../functions/src/stripe/usePremiumStatus";
import { auth, logout } from "../firebase/client";
import Button, { ButtonTypes } from "./Buttons/Button";
import Dropdown from "./Dropdown";
import Login from "./Login";
import Tag from "./Tag";
import PageHeading from "./typography/PageHeading";

interface Props {}

const AuthDisplay = ({}: Props) => {
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user as User);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // loading
  if (!user && userLoading) return <h1>Loading...</h1>;

  // no user
  if (!user && !userLoading) return <Login />;

  return (
    <div>
      {user && !userLoading && (
        <div className="flex items-center">
          {!userIsPremium ? (
            <Button
              type={ButtonTypes.ACTION}
              label="Upgrade to premium"
              onClick={() => createCheckoutSession(user.uid)}
            />
          ) : (
            <Tag content="🍪 Premium" extraClass="ml-auto" />
          )}
          <Dropdown
            isOpen={modalIsOpen}
            onClick={() => setModalIsOpen(!modalIsOpen)}
            items={[
              {
                label: "My Mockups",
                href: "/my-mockups",
              },
              {
                label: "Account",
                href: "/account",
              },

              {
                label: "Pricing",
                href: "/pricing",
              },
              {
                label: "Log out",
                itemOnClick: () => logout(),
              },
            ]}
          >
            <PageHeading heading={`Hi, ${user.displayName?.split(" ")[0]}`} />
          </Dropdown>
        </div>
      )}
    </div>
  );
};
export default AuthDisplay;
