interface Props {
  height: string;
  width: string;
  colour: string;
}

const DoubleTickIcon = ({ height, width, colour }: Props) => (
  <svg
    width="15"
    height="13"
    viewBox="0 0 15 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${colour} ${width} ${height}`}
    aria-label="double-tick-icon"
  >
    <path
      d="M1 7.58999L4.22018 11.541L11.567 1"
      stroke="#69D030"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.96365 10.6952L6.65322 11.541L14 1"
      stroke="#69D030"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

DoubleTickIcon.defaultProps = {
  height: "h-4.25",
  width: "w-4.25",
  colour: "#69D030",
};

export default DoubleTickIcon;
