import React from "react";
import { render, screen } from "@testing-library/react";
import StarIcon from "../StarIcon";

describe("StarIcon", () => {
  it("renders the default icon", () => {
    render(<StarIcon isFilled />);

    const icon = screen.getByLabelText("star-filled");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<StarIcon isFilled={false} height="h-7" width="w-1" colour="text-grey-500" />);

    const icon = screen.getByLabelText("star-empty");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7 text-grey-500");
  });
});
