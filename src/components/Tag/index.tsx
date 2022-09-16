import React, { ReactNode } from "react";

interface Props {
  content: ReactNode;
  extraClass?: string;
}

const Tag = ({ content, extraClass = "" }: Props) => {
  return (
    <div
      aria-label="tag-icon"
      className={`w-fit px-1.5 py-0.5 text-md border-2 border-yellow border-solid text-yellow rounded-md ${extraClass}`}
    >
      {content}
    </div>
  );
};
export default Tag;
