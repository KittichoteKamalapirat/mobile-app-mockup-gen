import CloseIcon from "@/components/icons/CloseIcon";
import { render, screen } from "@testing-library/react";
import IconButton from "../IconButton";

describe("IconButton", () => {
  test("renders component", () => {
    render(<IconButton label="test" onClick={() => undefined} icon={<CloseIcon />} />);

    const button = screen.getByLabelText("test");
    const icon = screen.getByLabelText("close");
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
