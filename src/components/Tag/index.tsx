import React, { ReactNode } from "react";

interface Props {
  content: ReactNode;
  color?: string;
  bg?: string;
  extraClass?: string;
  size?: "sm" | "md" | "lg";
}

const Tag = ({
  content,
  extraClass = "",
  size = "md",
  color = "text-yellow",
}: Props) => {
  const sizeStyle = (() => {
    switch (size) {
      case "sm":
        return "px-1 py-0.2 text-sm";
      case "lg":
        return "px-2 py-1 text-lg";

      default:
        return "px-1.5 py-0.5 text-md";
    }
  })();
  return (
    <div
      aria-label="tag-icon"
      className={`w-fit border-2 border-yellow border-solid rounded-md ${color} ${sizeStyle} ${extraClass} `}
    >
      {content}
    </div>
  );
};
export default Tag;
