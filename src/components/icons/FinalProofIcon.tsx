interface Props {
  height: string;
  width: string;
  colour: string;
}

const FinalProofIcon = ({ height, width, colour }: Props) => (
  <svg
    width="14"
    height="12"
    className={`${colour} ${width} ${height}`}
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="final-proof-icon"
  >
    <path d="M13.1548 1H1" stroke="#48B07E" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.1548 4.11719H1" stroke="#48B07E" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.3112 7.23242H1" stroke="#48B07E" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M10.7191 11.1302C12.2549 11.1302 13.5 9.88516 13.5 8.34929C13.5 6.81343 12.2549 5.56836 10.7191 5.56836C9.1832 5.56836 7.93814 6.81343 7.93814 8.34929C7.93814 9.88516 9.1832 11.1302 10.7191 11.1302Z"
      fill="#48B07E"
    />
    <path d="M6.3112 10.3457H1" stroke="#48B07E" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.33807 8.63863L10.1705 9.50885L12.0622 7.19141" fill="#48B07E" />
    <path
      d="M9.33807 8.63863L10.1705 9.50885L12.0622 7.19141"
      stroke="white"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

FinalProofIcon.defaultProps = {
  height: "h-5",
  width: "w-5",
  colour: "",
};

export default FinalProofIcon;
