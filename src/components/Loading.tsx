import React from "react";
import Spinner from "./Spinner";

interface LoadingProps {
  text?: string;
  overlay?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <Spinner />
        <p className="text-primary font-bold">{text ? text : "Loading..."}</p>
      </div>
    </div>
  );
};
