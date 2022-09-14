import React from "react";
import { render, screen } from "@testing-library/react";
import PencilEditIcon from "../PencilEditIcon";

describe("PencilEditIcon", () => {
  it("renders the default icon", () => {
    render(<PencilEditIcon />);

    const icon = screen.getByLabelText("edit-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<PencilEditIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("edit-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
