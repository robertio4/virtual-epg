import { render, screen } from "@testing-library/react";
import Liveline from "./Liveline";
import { SIZE_RATIO } from "../../constants";

describe("Liveline_function", () => {
  // Tests that the Liveline component renders without errors.
  it("test_liveline_renders_without_errors", () => {
    render(<Liveline />);
    expect(screen.getByTestId("liveline-container")).toBeInTheDocument();
  });

  // Tests that the liveline is positioned correctly based on the current time and the size ratio.
  it("test_liveline_positioning", () => {
    render(<Liveline />);
    const now = new Date();
    const nowMins = now.getMinutes() + now.getHours() * 60;
    const liveline = screen.getByTestId("liveline");
    expect(liveline).toHaveStyle(`left: ${nowMins * SIZE_RATIO}rem`);
  });
});
