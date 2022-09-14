import React from "react";
import { render, screen } from "@testing-library/react";
import ArrowIcon from "../ArrowIcon";

describe("ButtonIcon", () => {
  it("renders the default icon", () => {
    render(<ArrowIcon />);

    const icon = screen.getByLabelText("arrow-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<ArrowIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("arrow-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
