import React from "react";
import { render, screen } from "@testing-library/react";
import PersonIcon from "../PersonIcon";

describe("PersonIcon", () => {
  it("renders the default icon", () => {
    render(<PersonIcon />);

    const icon = screen.getByLabelText("person-icon");
    expect(icon).toBeInTheDocument();
  });
});
