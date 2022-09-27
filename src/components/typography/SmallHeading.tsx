interface Props {
  heading: string;
  fontSize: string;
  fontStyle: string;
  fontColour: string;
  spacing: string;
  extraClass?: string;
}

const SmallHeading = ({
  heading,
  fontSize,
  fontStyle,
  fontColour,
  spacing,
  extraClass,
}: Props) => (
  <h6
    className={`${fontSize} ${fontStyle} ${fontColour} ${spacing} ${extraClass}`}
  >
    {heading}
  </h6>
);

SmallHeading.defaultProps = {
  heading: "",
  fontSize: "text-11px",
  fontStyle: "font-TRegular font-bold",
  fontColour: "",
  spacing: "",
  extraClass: "",
};

export default SmallHeading;
