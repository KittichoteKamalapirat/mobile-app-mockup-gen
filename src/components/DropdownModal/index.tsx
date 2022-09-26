import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  button: ReactNode;
  isOpen: boolean;
}

const DropdownModal = ({ children, button, isOpen }: Props) => {
  return (
    <div>
      {button}
      <div
        id="dropdown"
        className={`${
          isOpen ? "block" : "hidden"
        } absolute px-4 z-10 w-max bg-white rounded divide-y divide-gray-100 shadow `}
      >
        {children}
      </div>
    </div>
  );
};
export default DropdownModal;
