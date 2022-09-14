interface Props {
  height: string;
  width: string;
  colour: string;
}

const LocationPinIcon = ({ height, width, colour }: Props) => (
  <svg
    className={`${colour} ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-label="location-pin-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

LocationPinIcon.defaultProps = {
  height: "h-5",
  width: "w-5",
  colour: "",
};

export default LocationPinIcon;
