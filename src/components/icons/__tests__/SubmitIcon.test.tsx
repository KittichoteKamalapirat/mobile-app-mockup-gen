import React from "react";
import { render, screen } from "@testing-library/react";
import SubmitIcon from "../SubmitIcon";

describe("SubmitIcon", () => {
  it("renders the default icon", () => {
    render(<SubmitIcon />);

    const icon = screen.getByLabelText("submit-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<SubmitIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("submit-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
