import React from "react";
import { render, screen } from "@testing-library/react";
import FolderIcon from "../FolderIcon";

describe("FolderIcon", () => {
  it("renders the default icon", () => {
    render(<FolderIcon />);

    const icon = screen.getByLabelText("folder-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<FolderIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("folder-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
