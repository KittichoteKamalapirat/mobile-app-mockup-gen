import React from "react";
import { brandName } from "../constants/brand";

interface Props {}

const Navbar = ({}: Props) => {
  return (
    <div className="flex py-2 px-10 justify-between w-full top-0 fixed bg-grey-900 text-grey-0">
      <div className="flex">
        <div className="mr-4">logo image</div>
        <p className="text-xl">{brandName}</p>
      </div>
      <div>
        <ul className="flex gap-4">
          <li>Contact</li>
          <li>About</li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
