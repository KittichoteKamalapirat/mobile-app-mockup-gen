import Link from "next/link";

export enum ButtonTypes {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  OUTLINED = "outlined",
  TEXT = "text",
}

export enum HTMLButtonType {
  SUBMIT = "submit",
  RESET = "reset",
  BUTTON = "button",
}

interface Props {
  onClick?: () => void;
  label: string;
  ariaLabel?: string;
  type: ButtonTypes;
  href: string;
  height: string;
  spacing: string;
  extraClass: string;
  buttonType?: HTMLButtonType;
  disabled: boolean;
  borderColour: string;
  borderRadius: string;
  borderWidth: string;
  fontSize: string;
  startIcon?: React.ReactNode;
  fontColour: string;
}

interface ClassProps {
  type: ButtonTypes;
  disabled: boolean;
  spacing: string;
  fontSize: string;
  extraClass: string;
  height: string;
  borderColour: string;
  borderRadius: string;
  borderWidth: string;
  fontColour: string;
}

const useClassName = ({
  type,
  disabled,
  spacing,
  borderRadius,
  borderColour,
  borderWidth,
  fontSize,
  fontColour,
  extraClass,
  height,
}: ClassProps) => {
  const commonClass = `${fontSize} ${height} ${spacing} ${borderRadius} ${extraClass} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;
  const borderClass = `${borderColour} ${borderWidth}`;

  switch (type) {
    case ButtonTypes.OUTLINED:
      return `hover:bg-grey-100 ${fontColour} ${borderClass} ${commonClass}`;

    case ButtonTypes.SECONDARY:
      return `bg-grey-100 hover:bg-grey-200 text-grey-250 text-opacity-70 text-11px font-nunito ${commonClass}`;

    case ButtonTypes.TEXT:
      return `${fontColour} hover:text-blurple-hovered text-15px underline px-0 ${commonClass}`;

    case ButtonTypes.PRIMARY:
    default:
      return `bg-blurple-link hover:bg-blurple-hovered text-white ${commonClass}`;
  }
};

const Button = ({
  onClick,
  label,
  ariaLabel,
  type,
  href,
  spacing,
  extraClass,
  buttonType,
  disabled,
  height,
  fontSize,
  borderColour,
  borderRadius,
  borderWidth,
  startIcon,
  fontColour,
}: Props) => {
  const className = useClassName({
    type,
    disabled,
    spacing,
    fontSize,
    extraClass,
    height,
    borderColour,
    borderRadius,
    borderWidth,
    fontColour,
  });

  const button = (
    <button
      disabled={disabled}
      type={buttonType}
      className={className}
      onClick={onClick}
      name={label}
      aria-label={ariaLabel ?? label}
    >
      <div className="flex flex-row items-center justify-center">
        {startIcon && <div className="mr-2.5">{startIcon}</div>}
        {label}
      </div>
    </button>
  );

  return href ? (
    <Link href={href}>
      <a>{button}</a>
    </Link>
  ) : (
    button
  );
};

Button.defaultProps = {
  type: ButtonTypes.PRIMARY,
  spacing: "px-5.5",
  height: "h-7.75",
  extraClass: "",
  href: "",
  buttonType: HTMLButtonType.BUTTON,
  disabled: false,
  borderRadius: "rounded-5px",
  borderColour: "border-blurple-link",
  borderWidth: "border",
  fontSize: "text-13px",
  fontColour: "text-blurple-link",
};

export default Button;
