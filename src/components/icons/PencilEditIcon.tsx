interface Props {
  height?: string;
  width?: string;
  colour?: string;
}

const PencilEditIcon = ({ height = "h-5", width = "w-5", colour = "text-green-faded" }: Props) => (
  <svg
    className={`${colour} ${width} ${height}`}
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="edit-icon"
    stroke="currentColor"
  >
    <path
      d="M12.092 7.29118V13.6528C12.0973 13.8245 12.0686 13.9956 12.0076 14.1563C11.9467 14.317 11.8547 14.4641 11.7369 14.5891C11.6191 14.7142 11.4778 14.8149 11.321 14.8853C11.1643 14.9558 10.9952 14.9947 10.8234 14.9997H2.27121C1.92413 14.9895 1.59532 14.8419 1.35705 14.5893C1.11878 14.3367 0.990549 13.9998 1.00054 13.6528V4.59102C0.991106 4.24428 1.11958 3.90796 1.35779 3.65583C1.596 3.4037 1.9245 3.25634 2.27121 3.24609H8.04695"
      stroke="#668977"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.17409 9.59349L7.36431 9.38721C7.53495 9.35646 7.69157 9.27274 7.81193 9.14793L14.4726 2.48932L12.9833 1L6.32674 7.65655C6.20339 7.7824 6.12136 7.94287 6.09158 8.11655L5.8853 9.30057C5.88155 9.33962 5.88641 9.37901 5.89954 9.41597C5.91267 9.45293 5.93374 9.48656 5.96128 9.51449C5.98881 9.54242 6.02214 9.56397 6.05891 9.57762C6.09568 9.59127 6.135 9.59668 6.17409 9.59349V9.59349Z"
      stroke="#668977"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.7517 2.23242L13.241 3.7238"
      stroke="#668977"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PencilEditIcon;
