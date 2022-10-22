import { User } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase/client";
import usePremiumStatus from "../hooks/usePremiumStatus";
import { createCheckoutSession } from "../stripe/createCheckoutSession";
import Button, { ButtonTypes } from "./Buttons/Button";
import Dropdown from "./Dropdown";
import LoginModal from "./LoginModal";
import Tag from "./Tag";
import PageHeading from "./typography/PageHeading";
import SmallHeading from "./typography/SmallHeading";

interface Props {}

const AuthDisplay = ({}: Props) => {
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user as User);
  const [premiumButtonIsLoading, setPremiumButtonIsLoading] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const handleSubscribe = async () => {
    if (!user) return;
    setPremiumButtonIsLoading(true);
    await createCheckoutSession(user.uid);
    setPremiumButtonIsLoading(false);
    return;
  };
  // loading
  if (!user && userLoading) return <h1>Loading...</h1>;

  // no user
  if (!user && !userLoading)
    return <LoginModal isOpen={modalIsOpen} toggleModal={toggleModal} />;

  return (
    <div>
      {user && !userLoading && (
        <div className="flex items-center">
          {!userIsPremium ? (
            <Button
              type={ButtonTypes.ACTION}
              fontSize="text-md"
              label="Upgrade to premium"
              loading={premiumButtonIsLoading}
              onClick={handleSubscribe}
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
            <SmallHeading
              fontSize="text-md"
              heading={`Hi, ${user.displayName?.split(" ")[0]}`}
            />
          </Dropdown>
        </div>
      )}
    </div>
  );
};
export default AuthDisplay;
