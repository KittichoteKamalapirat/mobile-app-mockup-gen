interface Props {
  height: string;
  width: string;
  colour: string;
}

const FolderIcon = ({ height, width, colour }: Props) => (
  <svg
    className={`${colour} ${width} ${height}`}
    aria-label="folder-icon"
    width="15"
    height="11"
    viewBox="0 0 15 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1191_417)">
      <path
        d="M0.946899 1.49414H12.4384C12.5873 1.49414 12.7302 1.55661 12.8355 1.6678C12.9408 1.77899 13 1.9298 13 2.08705V9.23559C13 9.39284 12.9408 9.54365 12.8355 9.65484C12.7302 9.76603 12.5873 9.8285 12.4384 9.8285H1.51221C1.36327 9.8285 1.22044 9.76603 1.11512 9.65484C1.00981 9.54365 0.950643 9.39284 0.950643 9.23559V1.49414H0.946899Z"
        stroke="#3B9CB2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M0.547049 1.49618V0.438817C0.547049 0.1977 0.796009 6.27165e-05 1.10861 6.27165e-05H3.35488C3.58795 -0.00237415 3.81673 0.06625 4.01378 0.1977L5.88567 1.49815L0.547049 1.49618Z"
        fill="#3B9CB2"
      />
    </g>
    <defs>
      <clipPath id="clip0_1191_417">
        <rect width="15" height="11" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

FolderIcon.defaultProps = {
  height: "h-5",
  width: "w-5",
  colour: "",
};

export default FolderIcon;
