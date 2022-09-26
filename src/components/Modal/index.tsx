import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import { primaryColor } from "../../../theme";
import { ICON_SIZE } from "../../constants";
import IconButton from "../Buttons/IconButton";

interface Props {
  contentLabel: string;
  isOpen: boolean;
  onAfterOpen?: () => void;
  onRequestClose: () => void;
  minWidth?: string;
  children: ReactNode;
  heading: ReactNode;
  maxWidth?: string;
  modalSpacing?: string;
  zIndex?: number;
}

const Modal = ({
  maxWidth,
  contentLabel,
  isOpen,
  onAfterOpen,
  onRequestClose,
  minWidth,
  children,
  heading,
  modalSpacing = "p-6",
  zIndex,
}: Props) => {
  const styles = {
    content: {
      minWidth: minWidth || "700px",
      maxWidth: maxWidth || "1200px",
      maxHeight: "700px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "25px",
    },
    overlay: { zIndex: zIndex || 1 },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={styles}
      ariaHideApp={false}
    >
      <div className={modalSpacing}>
        <div className="flex justify-between items-start">
          <p
            tabIndex={0}
            role="heading"
            aria-label="Login to your account"
            className="text-2xl font-extrabold leading-6 text-gray-800"
          >
            {heading}
          </p>

          <IconButton
            label="close"
            onClick={onRequestClose}
            icon={<IoMdClose size={ICON_SIZE - 10} color={primaryColor} />}
          />
        </div>
        <div> {children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
