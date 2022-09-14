interface Props {
  height: string;
  width: string;
  colour: string;
}

const SubmitIcon = ({ height, width, colour }: Props) => (
  <svg
    className={`${colour} ${width} ${height}`}
    aria-label="submit-icon"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.17308 3.14737C3.41484 1.82895 5.21429 1 7.21429 1C10.9615 1 14 3.91053 14 7.5C14 11.0895 10.9615 14 7.21429 14C5.11813 14 3.24725 13.0895 2 11.6605"
      fill="white"
    />
    <path
      d="M2.17308 3.14737C3.41484 1.82895 5.21429 1 7.21429 1C10.9615 1 14 3.91053 14 7.5C14 11.0895 10.9615 14 7.21429 14C5.11813 14 3.24725 13.0895 2 11.6605"
      stroke="#2D78CF"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M6.27895 5.4043L8.78421 7.77535H1"
      stroke="#2D78CF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.27895 10.1464L8.78421 7.77539H1"
      stroke="#2D78CF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

SubmitIcon.defaultProps = {
  height: "h-5",
  width: "w-5",
  colour: "",
};

export default SubmitIcon;
