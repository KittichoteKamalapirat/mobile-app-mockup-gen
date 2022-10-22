import React, { useState } from "react";
import Button, { ButtonTypes } from "./Buttons/Button";
import GoogleLogin from "./GoogleLogin";
import Modal from "./Modal";
import PageHeading from "./typography/PageHeading";

interface Props {
  isOpen?: boolean;
  toggleModal?: () => void;
}

const LoginModal = ({ isOpen, toggleModal }: Props) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <div>
      <Button
        label="Sign in"
        onClick={toggleModal}
        type={ButtonTypes.TEXT}
        fontColour="text-grey-0"
      />
      <Modal
        contentLabel="Sign in"
        isOpen={isOpen || open}
        onRequestClose={toggleModal || toggle}
        heading={<PageHeading heading="Login to your account" />}
        minWidth="40%"
        zIndex={20}
      >
        <GoogleLogin />
      </Modal>
    </div>
  );
};

export default LoginModal;
