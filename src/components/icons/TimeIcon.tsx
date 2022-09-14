interface Props {
  height: string;
  width: string;
  colour: string;
}

const TimeIcon = ({ height, width, colour }: Props) => (
  <svg
    className={`${colour} ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-label="time-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

TimeIcon.defaultProps = {
  height: "h-5",
  width: "w-5",
  colour: "",
};

export default TimeIcon;
