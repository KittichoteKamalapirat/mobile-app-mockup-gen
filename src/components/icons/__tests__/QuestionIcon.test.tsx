import React from "react";
import { render, screen } from "@testing-library/react";
import QuestionIcon from "../QuestionIcon";

describe("QuestionIcon", () => {
  it("renders the default icon", () => {
    render(<QuestionIcon />);

    const icon = screen.getByLabelText("question-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the icon with updated attributes", () => {
    render(<QuestionIcon height="h-7" width="w-1" />);

    const icon = screen.getByLabelText("question-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-1 h-7");
  });
});
