import React from "react";
import { render, screen } from "@testing-library/react";
import LocationPinIcon from "../LocationPinIcon";

describe("LocationPinIcon", () => {
  it("renders the default icon", () => {
    render(<LocationPinIcon />);

    const icon = screen.getByLabelText("location-pin-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<LocationPinIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("location-pin-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
