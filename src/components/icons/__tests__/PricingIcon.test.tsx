import React from "react";
import { render, screen } from "@testing-library/react";
import PricingIcon from "../PricingIcon";

describe("PricingIcon", () => {
  it("renders the default icon", () => {
    render(<PricingIcon />);

    const icon = screen.getByLabelText("pricing-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<PricingIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("pricing-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
