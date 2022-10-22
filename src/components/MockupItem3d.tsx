/* eslint-disable @next/next/no-img-element */
import { User } from "firebase/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import usePremiumStatus from "../hooks/usePremiumStatus";
import { brandName } from "../constants/brand";
import { auth } from "../firebase/client";
import { Mockup } from "../redux/slices/mockupReducer";
import Button from "./Buttons/Button";
import { Loading } from "./Loading";
import Toggle from "./Toggle";

// what's going on here

// On the screen is canva which was drawn by mockup.url (this is done so users can't download in <img/>)

// if transparent is off (default)
//    - add white bg in canvas
//    - download what's on the screen (intrinsic height and width so no worry the quality is lower)
// if transparent is toggled on
//    - remove white bg in canvas
//    - downnload the mockup.url directly (what's in the canvas is not used to download, just for display purpose)

interface Props {
  mockup: Mockup;
}

const MockupItem = ({ mockup }: Props) => {
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user as User);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = brandName + "_" + mockup.name;

    link.href = mockup.url;
    link.click();
  };

  return (
    <div className="flex flex-col items-center m-2 shadow-md bg-green ">
      <div className="flex flex-col items-center bg-yellow">
        <img
          src={mockup.url}
          className="object-contain w-full h-80"
          alt={`mockup-${mockup.name}`}
        />
      </div>

      <div className="my-4">
        <Button label="Download" onClick={handleDownload} />
      </div>
    </div>
  );
};
export default MockupItem;
