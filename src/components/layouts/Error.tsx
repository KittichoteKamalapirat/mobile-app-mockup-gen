import React from "react";

interface Props {
  errorMessage: string;
}
const Error = ({ errorMessage }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div>{errorMessage}</div>
    </div>
  );
};

export default Error;
