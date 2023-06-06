import { fireEvent, render, screen } from "@testing-library/react";
import Checkbox from "./Checkbox";
import { vi } from "vitest";

describe("Checkbox_function", () => {
  // Tests that the Checkbox component renders with the correct props.
  it("test_checkbox_renders_with_correct_props", () => {
    render(
      <Checkbox
        id="test"
        checked={false}
        onChange={() => vi.fn()}
        label="Test Checkbox"
      />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("id", "test");
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText("Test Checkbox")).toBeInTheDocument();
  });

  // Tests that the Checkbox label is displayed correctly.
  it("test_checkbox_label_displayed_correctly", () => {
    render(
      <Checkbox
        id="test"
        checked={false}
        onChange={() => vi.fn()}
        label="Test Checkbox"
      />
    );
    expect(screen.getByText("Test Checkbox")).toBeInTheDocument();
  });

  // Tests that the Checkbox is not checked by default.
  it("test_checkbox_not_checked_by_default", () => {
    render(
      <Checkbox
        id="test"
        checked={false}
        onChange={() => vi.fn()}
        label="Test Checkbox"
      />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  // Tests that the Checkbox onChange function is called when checked or unchecked.
  it("test_checkbox_on_change_function_called", () => {
    const onChangeMock = vi.fn();
    render(
      <Checkbox
        id="test"
        checked={false}
        onChange={onChangeMock}
        label="Test Checkbox"
      />
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
