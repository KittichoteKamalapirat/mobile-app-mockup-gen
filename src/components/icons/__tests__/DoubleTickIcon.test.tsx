import React from "react";
import { render, screen } from "@testing-library/react";
import DoubleTickIcon from "../DoubleTickIcon";

describe("DoubleTickIcon", () => {
  it("renders the default icon", () => {
    render(<DoubleTickIcon />);

    const icon = screen.getByLabelText("double-tick-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<DoubleTickIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("double-tick-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
