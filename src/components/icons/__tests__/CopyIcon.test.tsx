import React from "react";
import { render, screen } from "@testing-library/react";
import CopyIcon from "../CopyIcon";

describe("ButtonIcon", () => {
  it("renders the default icon", () => {
    render(<CopyIcon />);

    const icon = screen.getByLabelText("copy-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<CopyIcon size="36" />);

    const icon = screen.getByLabelText("copy-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("height", "36");
  });
});
