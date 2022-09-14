import React from "react";
import { render, screen } from "@testing-library/react";
import TimeIcon from "../TimeIcon";

describe("TimeIcon", () => {
  it("renders the default icon", () => {
    render(<TimeIcon />);

    const icon = screen.getByLabelText("time-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<TimeIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("time-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
