import React, { ReactNode } from "react";

interface Props {
  content: ReactNode;
  extraClass?: string;
}

const Tag = ({ content, extraClass = "" }: Props) => {
  return (
    <span
      aria-label="tag-icon"
      className={`px-1.5 py-0.5 text-md border-2 border-yellow border-solid text-yellow rounded-md ${extraClass}`}
    >
      {content}
    </span>
  );
};
export default Tag;
